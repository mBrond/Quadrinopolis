import Head from 'next/head';
import Link from 'next/link';
import './publicacao.css'; // Importe o CSS adequado
import Dropzone from '../components/Dropzone'

export default function PublicarObra() {
    return (
        <>
            <Head>
                <title>Publicar Obra</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <main className="main-container">
                {/* Link para o catálogo */}
                <div className="cadastro-obra-catalogo-container">
                    <Link href="/catalogo">
                            <span>Catálogo</span>
                    </Link>
                </div>

                {/* Título da página */}
                <div className="cadastro-obra-titulo">
                    <span>Cadastro Obra</span>
                </div>

                {/* Formulário para cadastro da obra */}
                <form>
                    <div className="main-form-container">
                        <div className="form-grupo" id="titulo-obra">
                            <input type="text" id="titulo" placeholder="Título" required />
                            <select name="" id="titulo-selecao"></select>
                        </div>
                        <div className="form-grupo form-sinopse">
                            <textarea id="sinopse" rows={4} placeholder="Sinopse" required></textarea>
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="capa">Capa</label>
                            <div className="arrastar-arquivo" id="capa">
                                <span>Arraste aqui</span>
                            </div>
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="conteudo">Conteúdo</label>
                            <div className="arrastar-arquivo" id="conteudo">
                                <Dropzone className="classe"></Dropzone>
                            </div>
                        </div>

                        <div className="form-grupo">
                            <label htmlFor="capitulo" id="capitulo-label">Capítulo</label>
                            <input type="number" id="capitulo" value="1" min="1" required />
                        </div>
                    </div>
                    <div className="main-botao-container">
                        <button type="submit" className="submit-btn">ENVIAR</button>
                    </div>
                </form>
            </main>
        </>
    );
}
