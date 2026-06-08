import { describe, test, expect, vi, beforeEach } from "vitest";
import { handleLogin } from "./loginService";

describe("handleLogin", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    test("salva tokens quando login é bem sucedido", async () => {

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        access: "token123",
                        refresh: "refresh123",
                    }),
            })
        );

        const resultado = await handleLogin(
            "teste@email.com",
            "batata123"
        );

        expect(resultado).toBe(true);

        expect(
            localStorage.getItem("access")
        ).toBe("token123");

        expect(
            localStorage.getItem("refresh")
        ).toBe("refresh123");
    });

    test("retorna false quando login falha", async () => {

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () =>
                    Promise.resolve({
                        error: "Usuário inválido",
                    }),
            })
        );

        window.alert = vi.fn();

        const resultado = await handleLogin(
            "teste@email.com",
            "errada"
        );

        expect(resultado).toBe(false);

        expect(window.alert).toHaveBeenCalled();
    });
});