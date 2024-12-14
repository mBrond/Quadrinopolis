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
                    <Link href="/" className="cadastro-obra-catalogo">
                        Catálogo
                    </Link>
                </div>

                {/* Título da página */}
                <h1 className="cadastro-obra-titulo">Publicar Obra</h1>

                {/* Formulário para cadastro da obra */}
                <div className="main-form-container">

                    <div className="form-grupo">
                        <label htmlFor="conteudo"></label>
                        <div className="arrastar-arquivo" id="conteudo">
                            <Dropzone className="dropzone" />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}