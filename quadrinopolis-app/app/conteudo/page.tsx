// pages/obra.js

import Link from 'next/link';
import './conteudo.css'; // Ajuste conforme a localização do seu arquivo CSS


export default function Obra() {
    return (
        <div>
            <header className="header-container">
                <div className="header">
                    <div className="logo-tipo">
                        <Link href="/catalogo">
                            
                                <h1>Quadrinópolis</h1>
                            
                        </Link>
                    </div>
                    <div className="header-entrar">
                        <Link href="/entrada">
                            Entrar
                        </Link>
                    </div>
                </div>
            </header>
            <main className="main-container">
                <div className="main-autor-container">
                    <div className="main-autor">
                        <span>Autor</span>
                    </div>
                </div>

                <div className="main-titulo">
                    <h1>Titulo</h1>
                    <p>
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis ducimus ea nesciunt deleniti facere
                        neque exercitationem tempora atque labore, nostrum quis ad fugiat quibusdam quas alias similique
                        corporis consectetur nemo?"
                    </p>
                </div>
                <div className="main-episodios-container">
                    <div className="main-titulo-episodios">
                        <h2>Episódios</h2>
                    </div>
                    <div className="main-episodios">
                        <Link href="/episodio">
                            Episódio 1
                        </Link>
                    </div>
                    <div className="main-episodios">
                        <Link href="/episodio">
                            Episódio 2
                        </Link>
                    </div>
                    <div className="main-episodios">
                        <Link href="/episodio">
                            Episódio 3
                        </Link>
                    </div>
                    {/* Repetir o bloco de "main-episodios" conforme necessário */}
                </div>

                <div className="main-adicionar-comentarios-container">
                    <div className="main-adicionar-comentarios-titulo">
                        <span>Adicionar Comentário</span>
                    </div>
                    <form className="main-adicionar-comentarios">
                        <textarea id="comentario-adc" rows={4} placeholder="Essa obra é sensacional..." required></textarea>
                        <button type="submit" className="botao-vertical">Enviar</button>
                    </form>
                </div>
                <div className="main-comentarios-container">
                    <div className="main-comentario">
                        <span>Miguel</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
                    </div>
                    <div className="main-comentario">
                        <span>Arthur</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus laudantium minus maxime commodi accusantium recusandae distinctio rem at est!</p>
                    </div>
                    <div className="main-comentario">
                        <span>Leandro</span>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium porro alias quidem consequatur autem animi nisi dolore sint.</p>
                    </div>
                </div>
                <div className="main-footer">
                    <span>Todos os direitos reservados</span>
                </div>
            </main>
        </div>
    );
}
