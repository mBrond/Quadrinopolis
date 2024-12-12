// app/api/moveDir/route.js
import fs from 'fs';
import path from 'path';

const moveDirectory = (source, destination) => {
  fs.renameSync(source, destination);
};

export async function POST(req) {
  const { dirPath } = await req.json(); // Obter o caminho da pasta a ser movida

  const sourcePath = path.join(process.cwd(),'public', dirPath);
  const destinationPath = path.join(process.cwd(), 'public', 'uploads', 'aprovado', path.basename(dirPath));

  console.log("SOURCE:")
  console.log(path.basename(dirPath))

  console.log("DESTINO:")
  console.log(destinationPath)

  try {
    fs.statSync(sourcePath); // Verifica se a pasta de origem existe
    
    moveDirectory(sourcePath, destinationPath); // Move a pasta

    return new Response(JSON.stringify({ message: 'Pasta movida com sucesso' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return new Response(JSON.stringify({ message: 'Pasta não encontrada' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Erro ao mover a pasta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}