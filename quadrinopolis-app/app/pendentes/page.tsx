// app/folders/page.js
'use client'
import { useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import DeleteDirButton  from '../components/deleteDir'
import MoveDirButton from '../components/moveDirButton'

const FoldersPage = () => {
  const [folders, setFolders] = useState([]);
  const [error, setError] = useState(null);

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
    <div>
      <h1>Folders</h1>
      <ul>
        {folders.map((folder, index) => (
          <li key={index} className='pendencias'>
            <div>
              {folder}
              <a href={`/uploads/${folder}/tess.pdf`} target="_blank" rel="noopener noreferrer" download>ABRIR ARQUIVO</a>
              <DeleteDirButton dirPath={`/uploads/pendente/${folder}`}></DeleteDirButton>
              <MoveDirButton dirPath={`/uploads/pendente/${folder}`}></MoveDirButton>
            </div>
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default FoldersPage;