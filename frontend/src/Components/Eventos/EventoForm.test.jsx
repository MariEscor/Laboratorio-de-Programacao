import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import { test, expect } from "vitest";
import EventoForm from "./EventoForm";

test("renderiza formulário de novo evento", () => {
    render(
        <EventoForm
            onSalvar={() => {}}
            eventoAtual={null}
            onCancelar={() => {}}
        />
    );

    expect(
        screen.getByText(/cadastro de novo evento/i)
    ).toBeInTheDocument();

    expect(
        screen.getByPlaceholderText("Nome do evento")
    ).toBeInTheDocument();

    expect(
        screen.getByPlaceholderText("Local")
    ).toBeInTheDocument();

    expect(
        screen.getByPlaceholderText("Descrição")
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", { name: /salvar evento/i })
    ).toBeInTheDocument();
});

test("renderiza formulário em modo de edição", () => {
    const eventoAtual = {
        id: 1,
        nome: "Workshop React",
        data: "2026-06-08",
        local: "UFV",
        descricao: "Evento de teste"
    };

    render(
        <EventoForm
            onSalvar={() => {}}
            eventoAtual={eventoAtual}
            onCancelar={() => {}}
        />
    );

    expect(
        screen.getByText(/editando evento/i)
    ).toBeInTheDocument();

    expect(
        screen.getByDisplayValue("Workshop React")
    ).toBeInTheDocument();

    expect(
        screen.getByDisplayValue("UFV")
    ).toBeInTheDocument();

    expect(
        screen.getByDisplayValue("Evento de teste")
    ).toBeInTheDocument();
});

test("não exibe botão cancelar ao criar novo evento", () => {
    render(
        <EventoForm
            onSalvar={() => {}}
            eventoAtual={null}
            onCancelar={() => {}}
        />
    );

    expect(
        screen.queryByRole("button", { name: /cancelar/i })
    ).not.toBeInTheDocument();
});

test("exibe botão cancelar ao editar evento", () => {
    const eventoAtual = {
        id: 1,
        nome: "Workshop React",
        data: "2026-06-08",
        local: "UFV",
        descricao: "Evento de teste"
    };

    render(
        <EventoForm
            onSalvar={() => {}}
            eventoAtual={eventoAtual}
            onCancelar={() => {}}
        />
    );

    expect(
        screen.getByRole("button", { name: /cancelar/i })
    ).toBeInTheDocument();
});

test("permite preencher os campos do evento", () => {
    render(
        <EventoForm
            onSalvar={() => {}}
            eventoAtual={null}
            onCancelar={() => {}}
        />
    );

    const nome = screen.getByPlaceholderText("Nome do evento");

    fireEvent.change(nome, {
        target: { value: "Semana da Batata" }
    });

    expect(nome.value).toBe("Semana da Batata");
});

test("chama onSalvar ao enviar formulário", () => {
    const mockSalvar = vi.fn();

    render(
        <EventoForm
            onSalvar={mockSalvar}
            eventoAtual={null}
            onCancelar={() => {}}
        />
    );

    fireEvent.change(
        screen.getByPlaceholderText("Nome do evento"),
        {
            target: { value: "Evento Teste" }
        }
    );

    fireEvent.click(
        screen.getByRole("button", {
            name: /salvar evento/i
        })
    );

    expect(mockSalvar).toHaveBeenCalled();
});

test("renderiza modo edição quando recebe eventoAtual", () => {
    render(
        <EventoForm
            onSalvar={() => {}}
            onCancelar={() => {}}
            eventoAtual={{
                nome: "Workshop React",
                data: "2026-06-12",
                local: "RU",
                descricao: "Testes de sabores de batatas"
            }}
        />
    );

    expect(
        screen.getByText(/editando evento/i)
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", {
            name: /atualizar evento/i
        })
    ).toBeInTheDocument();
});

test("chama onCancelar ao clicar em cancelar", () => {
    const mockCancelar = vi.fn();

    render(
        <EventoForm
            onSalvar={() => {}}
            onCancelar={mockCancelar}
            eventoAtual={{
                nome: "Workshop React",
                data: "2026-06-12",
                local: "RU",
                descricao: "Testes de sabores de batatas"
            }}
        />
    );

    fireEvent.click(
        screen.getByRole("button", {
            name: /cancelar/i
        })
    );

    expect(mockCancelar).toHaveBeenCalled();
});