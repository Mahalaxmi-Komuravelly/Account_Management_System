import React from 'react'
import { useState } from 'react'
const Signup = () => {

    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () =>{
        e.preventDefault();
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter Name' name='name' value={inputData.name} onChange={handleChange} />
                <input type="email" placeholder='Enter Email' name='email' value={inputData.email} onChange={handleChange} />
                <input type="password" placeholder='Enter Password' name='name' value={inputData.password} onChange={handleChange} />
                <button type='submit'>SignUp</button>
            </form>
        </div>
    )
}

export default Signup
