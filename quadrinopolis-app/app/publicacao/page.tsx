import Head from 'next/head';
import Link from 'next/link';
import './publicacao.css'; // Importe o CSS adequado
import Dropzone from '../components/Dropzone';

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
                    <Link href="/catalogo" className="cadastro-obra-catalogo">
                        Catálogo
                    </Link>
                </div>

                {/* Título da página */}
                <h1 className="cadastro-obra-titulo">Cadastro de Obra</h1>

                {/* Formulário para cadastro da obra */}
                <div className="main-form-container">

                    <div className="form-grupo">
                        <label htmlFor="conteudo">Conteúdo</label>
                        <div className="arrastar-arquivo" id="conteudo">
                            <Dropzone className="classe" />
                        </div>
                    </div>

                    <div className="form-grupo">
                        <label htmlFor="capitulo" id="capitulo-label">Capítulo</label>
                        <input type="number" id="capitulo" value="1" min="1" required />
                    </div>

                    <div className="main-botao-container">
                        <button type="submit" className="submit-btn">ENVIAR</button>
                    </div>
                </div>
            </main>
        </>
    );
}