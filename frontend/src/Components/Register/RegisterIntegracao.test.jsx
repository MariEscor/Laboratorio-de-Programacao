import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import Register from "./Register";
import { handleRegister } from "./registerService";
import { waitFor } from "@testing-library/react";

vi.mock("./registerService", () => ({
    handleRegister: vi.fn(() => Promise.resolve(true))
}));

test("chama handleRegister ao enviar formulário válido", async () => {
    render(
        <BrowserRouter>
            <Register />
        </BrowserRouter>
    );

    fireEvent.change(
        screen.getByPlaceholderText("Nome"),
        { target: { value: "João" } }
    );

    fireEvent.change(
        screen.getByPlaceholderText("Sobrenome"),
        { target: { value: "Silva" } }
    );

    fireEvent.change(
        screen.getByPlaceholderText("Telefone"),
        { target: { value: "34999999999" } }
    );

    fireEvent.change(
        screen.getByPlaceholderText("E-mail"),
        { target: { value: "joao@email.com" } }
    );

    fireEvent.change(
        screen.getByPlaceholderText("Senha"),
        { target: { value: "abc123" } }
    );

    fireEvent.change(
        screen.getByPlaceholderText("Confirmar senha"),
        { target: { value: "abc123" } }
    );

    fireEvent.click(
        screen.getByRole("button", { name: /cadastrar/i })
    );

    await waitFor(() => {
        expect(handleRegister).toHaveBeenCalled();
    });
});