import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

test("permite digitar e--mail", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const email = screen.getByPlaceholderText("E-mail");

    fireEvent.change(email, {
        target: { value: "teste@email.com" }
    });

    expect(email.value).toBe("teste@email.com");
});

test("permite digitar senha", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(senha, {
        target: { value: "123456" }
    });

    expect(senha.value).toBe("123456");
});

test("mostra e oculta senha ao clicar no ícone", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    expect(senha.type).toBe("password");

    const toggle = document.querySelector(".toggle");

    fireEvent.click(toggle);

    expect(senha.type).toBe("text");

    fireEvent.click(toggle);

    expect(senha.type).toBe("password");
});