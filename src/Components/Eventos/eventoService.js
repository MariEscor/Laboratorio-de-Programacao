export const listarEventos = async () => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/eventos/"
    );

    return await response.json();
};

export const criarEvento = async (evento) => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/eventos/criar/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(evento),
        }
    );

    return await response.json();
};

export const editarEvento = async (id, evento) => {
    const response = await fetch(
        `http://127.0.0.1:8000/api/eventos/${id}/editar/`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
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
        }
    );
};