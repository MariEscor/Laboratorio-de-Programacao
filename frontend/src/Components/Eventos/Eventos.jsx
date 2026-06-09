import { useEffect, useState } from "react";

import EventoForm from "./EventoForm";

import {
    listarEventos,
    criarEvento,
    editarEvento,
    excluirEvento,
} from "./eventoService";

import "./Eventos.css";

const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [eventoEditando, setEventoEditando] = useState(null);

    const carregarEventos = async () => {
        const dados = await listarEventos();
        setEventos(dados);
    };

    useEffect(() => {
        carregarEventos();
    }, []);

    const salvarEvento = async (evento) => {
        if (eventoEditando) {
            await editarEvento(
                eventoEditando.id,
                evento
            );

            setEventoEditando(null);
        } else {
            await criarEvento(evento);
        }

        carregarEventos();
    };

    const removerEvento = async (id) => {
        await excluirEvento(id);

        if (
            eventoEditando &&
            eventoEditando.id === id
        ) {
            setEventoEditando(null);
        }

        carregarEventos();
    };

    return (
        <div className="container eventos-container">
            <h1>Gerenciamento de Eventos</h1>

            <div className="eventos-layout">

                <div className="painel-formulario">
                    <EventoForm
                        onSalvar={salvarEvento}
                        eventoAtual={eventoEditando}
                        onCancelar={() =>
                            setEventoEditando(null)
                        }
                    />
                </div>

                <div className="painel-lista">
                    <h2 className="titulo-lista">
                        Eventos Cadastrados
                    </h2>

                    <div className="lista-eventos">
                        {eventos.map((evento) => (
                            <div
                                className="evento-card"
                                key={evento.id}
                            >
                                <div className="evento-header">
                                    <h2>{evento.nome}</h2>
                                </div>

                                <p>
                                    <strong>📅 Data:</strong>{" "}
                                    {new Date(
                                        evento.data
                                    ).toLocaleDateString(
                                        "pt-BR"
                                    )}
                                </p>

                                <p>
                                    <strong>📍 Local:</strong>{" "}
                                    {evento.local}
                                </p>

                                <p>{evento.descricao}</p>

                                <div className="acoes-evento">
                                    <button
                                        className="btn-editar"
                                        onClick={() =>
                                            setEventoEditando(
                                                evento
                                            )
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-excluir"
                                        onClick={() =>
                                            removerEvento(
                                                evento.id
                                            )
                                        }
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Eventos;