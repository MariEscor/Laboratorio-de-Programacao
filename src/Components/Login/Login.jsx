import React from 'react'
import {FaUser, FaLock, FaEye, FaEyeSlash} from 'react-icons/fa'
import { useState } from 'react'
import { Link } from "react-router-dom";
import "./Login.css"
import { handleLogin } from "./loginService";
import { testarRotaProtegida } from "../../teste";


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin(email, password);
        
        await testarRotaProtegida();
    };

const [showSenha, setShowSenha] = useState(false);

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>

                <div className='input-field'>
                    <input type="email" 
                    placeholder='E-mail' 
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <FaUser className='icon'/>
                </div>

                <div className='input-field senha-field'>
                    <input
                        type={showSenha ? "text" : "password"}
                        placeholder='Senha'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FaLock className='icon'/>

                    <span 
                        className="toggle"
                        onClick={() => setShowSenha(!showSenha)}
                    >
                        {showSenha ? <FaEyeSlash /> : <FaEye />}
                    </span>
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
