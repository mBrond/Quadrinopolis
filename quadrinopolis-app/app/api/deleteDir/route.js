// app/api/deleteDir/route.js
import fs from 'fs';
import path from 'path';

const deleteDirectory = (dirPath) => {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const currentPath = path.join(dirPath, file);
    if (fs.lstatSync(currentPath).isDirectory()) {
      deleteDirectory(currentPath);
    } else {
      fs.unlinkSync(currentPath);
    }
  }
  fs.rmdirSync(dirPath);
};

export async function DELETE(req) {
  const { dirPath } = await req.json(); // Parse the JSON body
  
  const directoryPath = path.join(process.cwd(), 'public', dirPath);
  
  console.log(directoryPath)
  try {
    fs.statSync(directoryPath); // Check if the directory exists
    deleteDirectory(directoryPath); // Delete the directory
    return new Response(JSON.stringify({ message: 'Directory deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error)
    if (error.code === 'ENOENT') {
      return new Response(JSON.stringify({ message: 'Directory not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Error deleting directory' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}