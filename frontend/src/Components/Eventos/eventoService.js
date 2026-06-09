const getHeaders = () => {
    const token = localStorage.getItem("access");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
};

export const listarEventos = async () => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/eventos/",
        {
            headers: getHeaders(),
        }
    );

    return await response.json();
};

export const criarEvento = async (evento) => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/eventos/criar/",
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(evento),
        }
    );

    const data = await response.json();

    console.log("STATUS:", response.status);
    console.log("RESPOSTA:", data);
    console.log("EVENTO ENVIADO:", evento);

    return data;
};

export const editarEvento = async (id, evento) => {
    const response = await fetch(
        `http://127.0.0.1:8000/api/eventos/${id}/editar/`,
        {
            method: "PUT",
            headers: getHeaders(),
            body: JSON.stringify(evento),
        }
    );

    return await response.json();
};

export const excluirEvento = async (id) => {
    await fetch(
        `http://127.0.0.1:8000/api/eventos/${id}/excluir/`,
        {
            method: "DELETE",
            headers: getHeaders(),
        }
    );
};