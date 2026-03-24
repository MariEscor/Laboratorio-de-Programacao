import React from 'react'
import {FaUser, FaLock} from 'react-icons/fa'

import { useState } from 'react'
import { Link } from "react-router-dom";

import "./Login.css"

const handleLogin = async (username, password) => {
    const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Login feito!");
    } else {
        alert(data.error);
    }
};

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(username, password);
};

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>
                <div className='input-field'>
                    <input type="email" 
                    placeholder='E-mail' 
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className='icon'/>
                </div>
                <div className='input-field'>
                    <input type="password" 
                    placeholder='Senha' 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className='icon'/>
                </div>

                <div className="recall-forget">
                    <label>
                        <input type="checkbox" />
                        Lembre de mim
                    </label>
                    <a href="#">Esqueceu a senha?</a>
                </div>

                <button>Entrar</button>

                <div className="signup-link">
                    <p>
                        Não tem uma conta? <Link to="/register">Registrar</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login
