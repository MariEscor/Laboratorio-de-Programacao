import { useState, useEffect } from "react";

const EventoForm = ({ onSalvar, eventoAtual, onCancelar }) => {

    const eventoVazio = {
        nome: "",
        data: "",
        local: "",
        descricao: "",
    };

    const [evento, setEvento] = useState(eventoVazio);

    useEffect(() => {
        if (eventoAtual) {
            setEvento(eventoAtual);
        } else {
            setEvento(eventoVazio);
        }
    }, [eventoAtual]);

    const handleChange = (e) => {
        setEvento({
            ...evento,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await onSalvar(evento);

        setEvento(eventoVazio);
    };

    return (
        <>
            {eventoAtual ? (
                <div className="editando-alerta">
                    ✏️ Editando evento:
                    <strong> {eventoAtual.nome}</strong>
                </div>
            ) : (
                <div className="novo-evento-alerta">
                    📅 Cadastro de Novo Evento
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="evento-input">
                    <input
                        type="text"
                        name="nome"
                        placeholder="Nome do evento"
                        value={evento.nome}
                        onChange={handleChange}
                    />
                </div>

                <div className="evento-input">
                    <input
                        type="date"
                        name="data"
                        value={evento.data}
                        onChange={handleChange}
                    />
                </div>

                <div className="evento-input">
                    <input
                        type="text"
                        name="local"
                        placeholder="Local"
                        value={evento.local}
                        onChange={handleChange}
                    />
                </div>

                <div className="evento-input">
                    <textarea
                        name="descricao"
                        placeholder="Descrição"
                        value={evento.descricao}
                        onChange={handleChange}
                    />
                </div>

                <div className="acoes-formulario">
                    <button type="submit">
                        {eventoAtual
                            ? "Atualizar Evento"
                            : "Salvar Evento"}
                    </button>

                    {eventoAtual && (
                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={() => {
                                setEvento(eventoVazio);
                                onCancelar();
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </>
    );
};

export default EventoForm;