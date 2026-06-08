import { describe, test, expect, vi } from "vitest";
import { handleRegister } from "./registerService";

describe("handleRegister", () => {

    test("retorna true quando cadastro é realizado", async () => {

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({}),
            })
        );

        window.alert = vi.fn();

        const resultado = await handleRegister({
            nome: "teste",
            sobrenome: "teste1",
            telefone: "1140028922",
            email: "teste1@email.com",
            senha: "batata123",
        });

        expect(resultado).toBe(true);

        expect(window.alert).toHaveBeenCalledWith(
            "Usuário criado com sucesso!"
        );
    });

    test("retorna false quando cadastro falha", async () => {

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () =>
                    Promise.resolve({
                        error: "Email já existe",
                    }),
            })
        );

        window.alert = vi.fn();

        const resultado = await handleRegister({
            nome: "teste",
            sobrenome: "teste1",
            telefone: "1140028922",
            email: "teste1@email.com",
            senha: "batata123",
        });

        expect(resultado).toBe(false);

        expect(window.alert).toHaveBeenCalledWith(
            "Email já existe"
        );
    });
});