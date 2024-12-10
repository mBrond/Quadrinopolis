// pages/avaliacao-obra.js

import Link from 'next/link';
import './avaliacao.css';  // Ajuste o caminho conforme necessário


export default function AvaliacaoObra() {
    return (
        <main className="main-container">
            <div className="main">
                <div className="titulo">
                    <h1>Avaliação obra</h1>
                </div>
                <div className="subtitulo">
                    <h2>Obras pendentes</h2>
                </div>
                <div className="avaliacao-container">
                    <div className="avaliacao">
                        <span>Obra tal</span>
                        <div className="botoes">
                            <button className="botao-aceitar">Aceitar</button>
                            <button className="botao-rejeitar">Rejeitar</button>
                        </div>
                    </div>
                    <div className="avaliacao">
                        <span>Obra tal</span>
                        <div className="botoes">
                            <button className="botao-aceitar">Aceitar</button>
                            <button className="botao-rejeitar">Rejeitar</button>
                        </div>
                    </div>
                    <div className="avaliacao">
                        <span>Obra tal</span>
                        <div className="botoes">
                            <button className="botao-aceitar">Aceitar</button>
                            <button className="botao-rejeitar">Rejeitar</button>
                        </div>
                    </div>
                    <div className="avaliacao">
                        <span>Obra tal</span>
                        <div className="botoes">
                            <button className="botao-aceitar">Aceitar</button>
                            <button className="botao-rejeitar">Rejeitar</button>
                        </div>
                    </div>
                    <div className="avaliacao">
                        <span>Obra tal</span>
                        <div className="botoes">
                            <button className="botao-aceitar">Aceitar</button>
                            <button className="botao-rejeitar">Rejeitar</button>
                        </div>
                    </div>
                </div>
                <div className="catalogo-container">
                    <Link href="/catalogo">
                        Catálogo
                    </Link>
                </div>
            </div>
        </main>
    );
}
