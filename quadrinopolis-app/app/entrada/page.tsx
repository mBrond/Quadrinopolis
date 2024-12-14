"use client"
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
import { Session } from "next-auth";
import { useRouter } from 'next/navigation'; // Importar o useRouter
import { signIn } from "next-auth/react"; // Ajustar a importação do signIn
import "./entrada.css"; // Importe o arquivo CSS adequado

export default function Entrar() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isFormSubmitting, setFormSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const values = {
            name: form.usuario.value,   // Obtém o valor do campo de usuário
            password: form.senha.value, 
            redirect: false,
        };

       

        try {
            setFormSubmitting(true);
            signIn("Credentials",{ ...values, redirect:false}).then(
                ({error}) => {
                    if(!error){
                        router.push("/");
                    }else{
                        renderError(error.replace("Error: ", ""));
                    }
                    setFormSubmitting(false);
                    
                }
            )
        } catch (error) {
            renderError("Erro ao tentar fazer login. Tente novamente mais tarde.");
            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setFormSubmitting(false);
        }
    };

    function renderError(msg) {
        setError(msg);
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    return (
        <>
            <Head>
                <title>Entrar</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <body className='body-imagem'>
                <main className="main-container">
                    <div className="main-logo-container">
                        <div className="main-logo-tipo">Quadrinópolis</div>
                    </div>
                    <div className="main-entrar-container">
                        <div className="main-entrar-bem-vindo">
                            <p>Bem Vindo!</p>
                        </div>
                        <div className="main-entrar-estrada-container">
                            <form onSubmit={handleSubmit} className="main-entrar-entrada-form">
                                <input
                                    type="text"
                                    name="usuario"
                                    id="usuario"
                                    placeholder="Usuário"
                                    required
                                    />
                                <input
                                    type="password"
                                    name="senha"
                                    id="senha"
                                    placeholder="Senha"
                                    required
                                    />
                                {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}
                                <button type="submit" disabled={isFormSubmitting}>
                                    {isFormSubmitting ? "Carregando..." : "Entrar"}
                                </button>
                            </form>
                            <div className="main-entrar-entrada-registro">
                                <p>Não possui cadastro?</p>
                                <Link href="/registro">Registrar</Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer-catalogo-container">
                        <Link href="/">
                            <div className="footer-catalogo">Catálogo</div>
                        </Link>
                    </div>
                </main>
            </body>
        </>
    );
}
