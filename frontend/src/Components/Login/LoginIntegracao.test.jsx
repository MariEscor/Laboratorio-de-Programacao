import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";

import Login from "./Login";
import { handleLogin } from "./loginService";

vi.mock("./loginService", () => ({
    handleLogin: vi.fn(() => Promise.resolve(true))
}));

vi.mock("../../teste", () => ({
    testarRotaProtegida: vi.fn(() => Promise.resolve())
}));

test("chama handleLogin ao enviar formulário válido", async () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    fireEvent.change(
        screen.getByPlaceholderText("E-mail"),
        { target: { value: "teste@email.com" } }
    );

    fireEvent.change(
        screen.getByPlaceholderText("Senha"),
        { target: { value: "abc123" } }
    );

    fireEvent.click(
        screen.getByRole("button", { name: /entrar/i })
    );

    await waitFor(() => {
        expect(handleLogin).toHaveBeenCalled();
    });
});