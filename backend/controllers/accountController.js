import supabase from "../config/supabaseClient.js";

export const getBalance = async (req, res) => {
  try {
    const userId = req.user.id; 

    const { data: user, error } = await supabase
      .from("users")
      .select("balance")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: "User not found", error });
    }

    res.status(200).json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: "Failed to get balance", error: err.message });
  }
};

export const getStatement = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: transactions, error } = await supabase
      .from("transactions")
      .select("*")
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ message: "Failed to fetch transactions", error });
    }

    res.status(200).json({ transactions });
  } catch (err) {
    res.status(500).json({ message: "Error fetching statement", error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, email");

    if (error) {
      return res.status(500).json({ message: "Failed to fetch users", error });
    }

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

export const transfer = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, amount } = req.body;

    if (!receiverId || !amount || amount <= 0) {
      return res.status(400).json({ message: "Receiver and valid amount required" });
    }

    // Get sender
    const { data: sender, error: senderError } = await supabase
      .from("users")
      .select("*")
      .eq("id", senderId)
      .single();

    if (senderError || !sender) {
      return res.status(404).json({ message: "Sender not found", error: senderError });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const { data: receiver, error: receiverError } = await supabase
      .from("users")
      .select("*")
      .eq("id", receiverId)
      .single();

    if (receiverError || !receiver) {
      return res.status(404).json({ message: "Receiver not found", error: receiverError });
    }

    const { error: updateSenderError } = await supabase
      .from("users")
      .update({ balance: sender.balance - amount })
      .eq("id", senderId);

    const { error: updateReceiverError } = await supabase
      .from("users")
      .update({ balance: receiver.balance + amount })
      .eq("id", receiverId);

    if (updateSenderError || updateReceiverError) {
      return res.status(500).json({ message: "Failed to update balances", error: updateSenderError || updateReceiverError });
    }

    await supabase.from("transactions").insert([
      {
        sender_id: senderId,
        receiver_id: receiverId,
        amount,
        transaction_type: "debit"
      },
      {
        sender_id: senderId,
        receiver_id: receiverId,
        amount,
        transaction_type: "credit"
      }
    ]);

    res.status(200).json({ message: "Transfer successful" });
  } catch (err) {
    res.status(500).json({ message: "Error during transfer", error: err.message });
  }
};