'use client'
// components/DirectoryList.tsx
import { useEffect, useState } from 'react';

const DirectoryList: React.FC<{ dirPath: string }> = ({ dirPath }) => {
  const [directories, setDirectories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        console.log(dirPath)
        const response = await fetch(`/api/dirPendentes/route?path=${encodeURIComponent(dirPath)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch directories');
        }
        const data: string[] = await response.json();
        setDirectories(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDirectories();
  }, [dirPath]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Diretórios em {dirPath}</h1>
      <ul>
        {directories.map((directory) => (
          <li key={directory}>{directory}</li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryList;