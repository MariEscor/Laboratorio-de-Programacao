export const handleLogin = async (email, password) => {
    const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const data = await response.json();

    if (response.ok) {

        localStorage.setItem(
            "access",
            data.access
        );

        localStorage.setItem(
            "refresh",
            data.refresh
        );

        console.log(
            "TOKEN:",
            data.access
        );

        return true;
    }

    alert(data.error);
    return false;
};