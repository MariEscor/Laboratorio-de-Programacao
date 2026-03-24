export const handleRegister = async (formData) => {
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.senha,
            nome: formData.nome,
            sobrenome: formData.sobrenome,
            telefone: formData.telefone
        })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Usuário criado com sucesso!");
    } else {
        alert(data.error);
    }
};