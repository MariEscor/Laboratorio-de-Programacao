import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renderiza a tela de login", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    expect(screen.getByText("Acesse o sistema")).toBeInTheDocument();
});

test("renderiza os campos principais do login", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(
        screen.getByRole("button", { name: /entrar/i })
    ).toBeInTheDocument();
});

test("renderiza o link de cadastro", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    expect(
        screen.getByText(/não tem uma conta/i)
    ).toBeInTheDocument();

    expect(
        screen.getByRole("link", { name: /cadastrar-se/i })
    ).toBeInTheDocument();
});

test("campo de senha inicia oculto", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    expect(senha).toHaveAttribute("type", "password");
});

test("permite digitar email e senha", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const email = screen.getByPlaceholderText("E-mail");
    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(email, {
        target: { value: "teste@email.com" }
    });

    fireEvent.change(senha, {
        target: { value: "123456" }
    });

    expect(email.value).toBe("teste@email.com");
    expect(senha.value).toBe("123456");
});

test("permite mostrar e ocultar a senha", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    expect(senha).toHaveAttribute(
        "type",
        "password"
    );

    const toggle = document.querySelector(".toggle");

    fireEvent.click(toggle);

    expect(senha).toHaveAttribute(
        "type",
        "text"
    );

    fireEvent.click(toggle);

    expect(senha).toHaveAttribute(
        "type",
        "password"
    );
});

test("permite enviar o formulário", () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const botao = screen.getByRole(
        "button",
        { name: /entrar/i }
    );

    fireEvent.click(botao);

    expect(botao).toBeInTheDocument();
});