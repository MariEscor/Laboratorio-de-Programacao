import React from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import { handleLogin } from "./loginService";
import { testarRotaProtegida } from "../../teste";

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showSenha, setShowSenha] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const sucesso = await handleLogin(
            email,
            password
        );

        if (sucesso) {
            await testarRotaProtegida();
            navigate("/eventos");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>

                <div className='input-field'>
                    <input
                        type="email"
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
                
                <button>Entrar</button>
            </form>
        </div>
    )
}

export default Login