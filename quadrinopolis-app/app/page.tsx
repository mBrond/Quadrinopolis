import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Catalogo() {
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
                    {[
                        'Omv.jpg',
                        'lookism.jpg',
                        'solo-leveling.jpg',
                        'Omv.jpg',
                        'lookism.jpg',
                        'solo-leveling.jpg',
                        'Omv.jpg',
                        'lookism.jpg',
                        'solo-leveling.jpg',
                    ].map((image, index) => (
                        <Link href="/obra" key={index} className="link-obra">
                                <Image
                                    src={`/images/${image}`}
                                    alt={`obra-${index}`}
                                    width={150}
                                    height={200}
                                    className="main-catalogo-imagem"
                                />
                        </Link>
                    ))}
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
