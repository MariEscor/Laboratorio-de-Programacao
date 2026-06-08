export const validarSenha = (senha) => {
    return {
        tamanho: senha.length >= 6,
        numero: /\d/.test(senha),
        letra: /[a-zA-Z]/.test(senha),
    };
};