"use client"
import Head from 'next/head';
import Link from 'next/link';
import './registro.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Registrar() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [isFormSubmitting, setFormSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            renderError("As senhas não coincidem");
            return;
        }

        setFormSubmitting(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    password: formData.password,
                }),
            });

            const result = await response.json();

            if (result.status === 201) {
                alert(result.message);
                router.push('/entrada');
            } else {
                renderError(result.message);
            }
        } catch (error) {
            renderError('Erro ao criar a conta, tente novamente mais tarde');
        } finally {
            setFormSubmitting(false);
        }
    }

    function renderError(msg:string) {
        setError(msg);
        setTimeout(() => {
            setError('');
        }, 3000);
    }

    return (
        <>
            <Head>
                <title>Registrar</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <body className='body-imagem'>
                <main className="main-container">
                    <div className="main-logo-container">
                        <div className="main-logo-tipo">Quadrinópolis</div>
                    </div>
                    <div className="main-registrar-container">
                        <div className="main-registrar-bem-vindo">
                            <p>Bem-vindo!</p>
                        </div>
                        <div className="main-registrar-estrada-container">
                            <form
                                onSubmit={handleSubmit}
                                className="main-registrar-registro-form"
                                >
                                <p className="criar-conta">Criar Conta</p>
                                {error && <p className="error-message">{error}</p>}
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    id="usuario-registro"
                                    placeholder="Usuário"
                                    />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    id="senha-registro"
                                    placeholder="Senha"
                                    />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    id="senha-registro2"
                                    placeholder="Confirmar Senha"
                                    />
                                <button
                                    type="submit"
                                    disabled={isFormSubmitting}
                                    >
                                    {isFormSubmitting ? 'Carregando...' : 'Registrar'}
                                </button>
                            </form>
                            <div className="main-registrar-registro-entrada">
                                <p>Já possui cadastro?</p>
                                <Link href="/entrada">Entrar</Link>
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
