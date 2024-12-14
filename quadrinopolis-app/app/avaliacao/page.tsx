// pages/avaliacao-obra.js
'use client'
import Link from 'next/link';
import './avaliacao.css';  // Ajuste o caminho conforme necessário
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import DeleteDirButton  from '../components/deleteDir'
import MoveDirButton from '../components/moveDirButton'
import DownloadButton from '../components/DownloadButton'
import { useSession } from "next-auth/react";


export default function AvaliacaoObra() {
    const [folders, setFolders] = useState([]);
    const [error, setError] = useState(null);

    const { data: session } = useSession();


    useEffect(() => {
        const fetchFolders = async () => {
          try {
            const response = await fetch('/api/folders');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setFolders(data);
          } catch (error) {
            console.log(error)
          }
        };
    
        fetchFolders();
      }, []);
    
      if (error) {
        return <div>Error: {error}</div>;
      }

    return (
        <main className="main-container">
            {session?.user.name == "admin"?(
                <div className="main">
                <div className="titulo">
                    <p>Bem vindo {session?.user.name} </p>
                    <h1>Avaliação obra</h1>
                </div>
                <div className="subtitulo">
                    <h2>Obras pendentes</h2>
                </div>
                <div className="avaliacao">
                    <div>
                        <ul>
                            {folders.map((folder, index) => (
                            <li key={index} className='pendencias'>
                                <span>{folder}</span>
                                <div className="botoes">
                                    <DownloadButton dirPath={`public/uploads/pendente/${folder}`}></DownloadButton>
                                    <DeleteDirButton dirPath={`/uploads/pendente/${folder}`}></DeleteDirButton>
                                    <MoveDirButton dirPath={`/uploads/pendente/${folder}`}></MoveDirButton>
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="catalogo-container">
                    <Link href="/">
                        Catálogo
                    </Link>
                </div>
            </div>
            ):(
                <p>Apenas admins podem acesar essa pagina</p>
            )}
            
        </main>
    );
}
