import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

test("permite preencher o nome", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const nome = screen.getByPlaceholderText("Nome");

    fireEvent.change(nome, {
        target: { value: "João" }
    });

    expect(nome.value).toBe("João");
});

test("permite preencher email", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const email = screen.getByPlaceholderText("E-mail");

    fireEvent.change(email, {
        target: { value: "joao@email.com" }
    });

    expect(email.value).toBe("joao@email.com");
});

test("permite preencher senha", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(senha, {
        target: { value: "abc123" }
    });

    expect(senha.value).toBe("abc123");
});

test("mostra e oculta a senha", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    expect(senha.type).toBe("password");

    const toggles = document.querySelectorAll(".toggle");

    fireEvent.click(toggles[0]);

    expect(senha.type).toBe("text");

    fireEvent.click(toggles[0]);

    expect(senha.type).toBe("password");
});

test("mostra e oculta confirmar senha", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const confirmarSenha =
        screen.getByPlaceholderText("Confirmar senha");

    expect(confirmarSenha.type).toBe("password");

    const toggles = document.querySelectorAll(".toggle");

    fireEvent.click(toggles[1]);

    expect(confirmarSenha.type).toBe("text");

    fireEvent.click(toggles[1]);

    expect(confirmarSenha.type).toBe("password");
});

test("marca requisito de número quando senha possui número", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(senha, {
        target: { value: "abc123" }
    });

    const regraNumero = screen.getByText(
        /pelo menos 1 número/i
    );

    expect(regraNumero).toHaveClass("ok");
});

test("marca requisito de letra quando senha possui letra", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(senha, {
        target: { value: "123456" }
    });

    const regraLetra = screen.getByText(
        /pelo menos 1 letra/i
    );

    expect(regraLetra).not.toHaveClass("ok");

    fireEvent.change(senha, {
        target: { value: "abc123" }
    });

    expect(regraLetra).toHaveClass("ok");
});

test("marca requisito de tamanho mínimo", () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    const senha = screen.getByPlaceholderText("Senha");

    fireEvent.change(senha, {
        target: { value: "abc" }
    });

    const regraTamanho = screen.getByText(
        /mínimo 6 caracteres/i
    );

    expect(regraTamanho).not.toHaveClass("ok");

    fireEvent.change(senha, {
        target: { value: "abc123" }
    });

    expect(regraTamanho).toHaveClass("ok");
});