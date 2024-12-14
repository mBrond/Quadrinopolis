import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import "./catalogo.css";

export default function Catalogo() {

    const uploadsPath = path.join(process.cwd(), '/public/uploads/aprovado');
    console.log("Uploads Path: ", uploadsPath)
    console.log('Arquivos encontrados no diretório:', fs.readdirSync(uploadsPath));
  
    const pdfFiles = fs.readdirSync(uploadsPath);
    console.log(pdfFiles); 
    return (
        <>
            <Head>
                <title>Catálogo</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header className="header-container">
                <div className="header">
                    <div className="logo-tipo">
                        <h1>Quadrinópolis</h1>
                    </div>
                    <div className="header-entrar">
                        <Link href="/entrada">
                            Entrar
                        </Link>
                    </div>
                </div>
            </header>

            <main className="main-">
                <div className="main-pesquisar-container">
                    <div className="main-pesquisar-logo-obra">
                        <Image
                            src="/images/livro.png"
                            alt="livro"
                            width={50}
                            height={50}
                            className="main-pesquisar-livrinho-obra"
                        />
                        <p>Obras</p>
                    </div>
                    <div className="main-pesquisar-pesquisa">
                        <form action="/buscar" method="get" className="main-pesquisar-pesquisa-barra-pesquisa">
                            <button type="submit" className="main-pesquisar-pesquisa-lupa-botao">
                                <Image
                                    src="/images/lupa.png"
                                    alt="lupa-pesquisar"
                                    width={20}
                                    height={20}
                                    className="main-pesquisar-pesquisa-lupa-pesquisar"
                                />
                            </button>
                            <input type="text" name="pesquisa" id="pesquisa" placeholder="Pesquisar" />
                        </form>
                    </div>
                </div>

                <div className="main-catalogo-container">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {pdfFiles.map((file) => (
                    <li key={file} className="p-4 border rounded shadow hover:shadow-lg">
                        <a href={`conteudo/${file}`} className="text-blue-500 hover:underline">{file.replace('.pdf', '')}</a>
                        <Link href={`conteudo/${file}`}>
                            <Image alt="image" src={`/uploads/aprovado/${file}/capa.jpg`} width={150} height={200}/>
                        </Link>
                    </li>
                    ))}
                </ul>
                </div>


                <div className="main-publicar-container">
                    <Link href="/publicacao">
                        Publicar Obra
                    </Link>
                </div>
                <div className="footer-logo-container">
                    <div className="footer-logo-tipo">Quadrinópolis</div>
                </div>
            </main>
        </>
    );
}
