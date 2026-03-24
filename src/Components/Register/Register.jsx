import React, { useState } from "react";
import {
    FaUser,
    FaLock,
    FaPhone,
    FaEnvelope,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import "./Register.css";
import { handleRegister } from "./registerService.js";

const Register = () => {
    const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
});

const [showSenha, setShowSenha] = useState(false);
const [showConfirmar, setShowConfirmar] = useState(false);

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value,
    });
};


const validarSenha = (senha) => {
    return {
        tamanho: senha.length >= 6,
        numero: /\d/.test(senha),
        letra: /[a-zA-Z]/.test(senha),
    };
};

const regrasSenha = validarSenha(formData.senha);


const handleSubmit = async (e) => {
    e.preventDefault();

    if (!regrasSenha.tamanho || !regrasSenha.numero || !regrasSenha.letra) {
        alert("A senha não atende aos requisitos!");
        return;
    }

    if (formData.senha !== formData.confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    await handleRegister(formData);
};

return (
    <div className="container">
        <form onSubmit={handleSubmit}>
        <h1>Crie sua conta</h1>

        <div className="input-field">
            <input
                type="text"
                name="nome"
                placeholder="Nome"
                onChange={handleChange}
            />
            <FaUser className="icon" />
        </div>

        <div className="input-field">
            <input
                type="text"
                name="sobrenome"
                placeholder="Sobrenome"
                onChange={handleChange}
            />
            <FaUser className="icon" />
        </div>

        <div className="input-field">
            <input
                type="tel"
                name="telefone"
                placeholder="Telefone"
                onChange={handleChange}
            />
            <FaPhone className="icon" />
        </div>

        <div className="input-field">
            <input
                type="email"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
            />
            <FaEnvelope className="icon" />
        </div>

        {/* SENHA */}
        <div className="input-field senha-field">
            <input
                type={showSenha ? "text" : "password"}
                name="senha"
                placeholder="Senha"
                onChange={handleChange}
            />
            <FaLock className="icon" />

            <span className="toggle" onClick={() => setShowSenha(!showSenha)}>
                {showSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>

        {/* REGRAS DA SENHA */}
        <div className="password-rules">
            <p className={regrasSenha.tamanho ? "ok" : ""}>
                • Mínimo 6 caracteres
            </p>
            <p className={regrasSenha.numero ? "ok" : ""}>
                • Pelo menos 1 número
            </p>
            <p className={regrasSenha.letra ? "ok" : ""}>
                • Pelo menos 1 letra
            </p>
        </div>

        {/* CONFIRMAR SENHA */}
        <div className="input-field senha-field">
            <input
            type={showConfirmar ? "text" : "password"}
            name="confirmarSenha"
            placeholder="Confirmar senha"
            onChange={handleChange}
            />
            <FaLock className="icon" />

            <span
            className="toggle"
            onClick={() => setShowConfirmar(!showConfirmar)}
            >
            {showConfirmar ? <FaEyeSlash /> : <FaEye />}
            </span>
        </div>

        <button type="submit">Cadastrar</button>

        <div className="signup-link">
            <p>
            Já tem uma conta? <a href="/">Login</a>
            </p>
        </div>
        </form>
    </div>
    );
};

export default Register;