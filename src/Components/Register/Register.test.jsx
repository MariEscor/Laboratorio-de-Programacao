import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

test("renderiza a tela de cadastro", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    expect(screen.getByText("Crie sua conta")).toBeInTheDocument();
});

test("renderiza todos os campos do cadastro", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Sobrenome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Telefone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar senha")).toBeInTheDocument();
});

test("renderiza botão cadastrar", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    expect(
        screen.getByRole("button", { name: /cadastrar/i })
    ).toBeInTheDocument();
});

test("renderiza as regras da senha", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    expect(
        screen.getByText(/mínimo 6 caracteres/i)
    ).toBeInTheDocument();

    expect(
        screen.getByText(/pelo menos 1 número/i)
    ).toBeInTheDocument();

    expect(
        screen.getByText(/pelo menos 1 letra/i)
    ).toBeInTheDocument();
});

test("permite preencher os campos do cadastro", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const nome = screen.getByPlaceholderText("Nome");
    const email = screen.getByPlaceholderText("E-mail");

    fireEvent.change(nome, {
        target: { value: "Batata" }
    });

    fireEvent.change(email, {
        target: { value: "batata@email.com" }
    });

    expect(nome.value).toBe("Batata");
    expect(email.value).toBe("batata@email.com");
});

test("permite mostrar e ocultar a senha", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    expect(senha).toHaveAttribute("type", "password");

    const toggles = document.querySelectorAll(".toggle");

    fireEvent.click(toggles[0]);

    expect(senha).toHaveAttribute("type", "text");

    fireEvent.click(toggles[0]);

    expect(senha).toHaveAttribute("type", "password");
});

test("atualiza as regras da senha conforme o usuário digita", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(senha, {
        target: { value: "batata123" }
    });

    expect(
        screen.getByText(/mínimo 6 caracteres/i)
    ).toHaveClass("ok");

    expect(
        screen.getByText(/pelo menos 1 número/i)
    ).toHaveClass("ok");

    expect(
        screen.getByText(/pelo menos 1 letra/i)
    ).toHaveClass("ok");
});

test("permite enviar o formulário de cadastro", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const botao = screen.getByRole(
        "button",
        { name: /cadastrar/i }
    );

    fireEvent.click(botao);

    expect(botao).toBeInTheDocument();
});