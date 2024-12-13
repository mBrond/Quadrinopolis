// pages/obra.js

import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';
import Link from 'next/link';
import './conteudo.css'; // Ajuste conforme a localização do seu arquivo CSS


export default function Obra({ params }: { params: { filename: string } }) {

    const { filename } = params;

    // Caminho para a pasta onde os PDFs estão armazenados
    const uploadsPath = path.join(process.cwd(), 'public/uploads/aprovado');
    const subdirectoryPath = path.join(uploadsPath, filename);
  
    // Verifica se o subdiretório existe
    if (!fs.existsSync(subdirectoryPath)) {
      return notFound(); // Retorna 404 se a pasta não existir
    }
  
    // Procura por um arquivo PDF dentro do subdiretório
    const pdfFile = fs
      .readdirSync(subdirectoryPath) // Lista os arquivos na pasta
      .find(file => file.endsWith('.pdf')); // Encontra o primeiro arquivo com extensão .pdf
  
    if (!pdfFile) {
      return notFound(); // Retorna 404 se nenhum arquivo PDF for encontrado
    }
  
    // Caminho relativo do PDF para o navegador
    const relativePath = `/uploads/aprovado/${filename}/${pdfFile}`;
    return (
        <div>
            <header className="header-container">
                <div className="header">
                    <div className="logo-tipo">
                        <Link href="/">
                            
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
            <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Visualizando: {pdfFile}</h1>
      <embed
        src={relativePath} // Caminho relativo correto para o PDF
        type="application/pdf"
        width="100%"
        height="800px"
      />
      <a href="/list" className="text-blue-500 hover:underline mt-4 block">
        Voltar para a lista
      </a>
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
