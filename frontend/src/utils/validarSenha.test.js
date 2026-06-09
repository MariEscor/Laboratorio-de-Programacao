import { describe, test, expect } from "vitest";
import { validarSenha } from "./validarSenha";

describe("validarSenha", () => {

    test("senha válida", () => {
        expect(
            validarSenha("abc123")
        ).toEqual({
            tamanho: true,
            numero: true,
            letra: true,
        });
    });

    test("senha sem número", () => {
        expect(
            validarSenha("abcdef")
        ).toEqual({
            tamanho: true,
            numero: false,
            letra: true,
        });
    });

    test("senha sem letra", () => {
        expect(
            validarSenha("123456")
        ).toEqual({
            tamanho: true,
            numero: true,
            letra: false,
        });
    });

    test("senha muito curta", () => {
        expect(
            validarSenha("ab1")
        ).toEqual({
            tamanho: false,
            numero: true,
            letra: true,
        });
    });

    test("senha vazia", () => {
        expect(
            validarSenha("")
        ).toEqual({
            tamanho: false,
            numero: false,
            letra: false,
        });
    });

});