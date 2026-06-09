import axios from "axios";

const API = "http://localhost:8000/api";

export const listarEventos = () =>
    axios.get(`${API}/eventos/`);

export const criarEvento = (dados) =>
    axios.post(`${API}/eventos/criar/`, dados);

export const editarEvento = (id, dados) =>
    axios.put(`${API}/eventos/${id}/editar/`, dados);

export const excluirEvento = (id) =>
    axios.delete(`${API}/eventos/${id}/excluir/`);