export const testarRotaProtegida = async () => {

    const token = localStorage.getItem("access");

    console.log("TOKEN ENVIADO:", token);

    const response = await fetch(
        "http://127.0.0.1:8000/api/protegido/",
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("RESPOSTA:", data);

};