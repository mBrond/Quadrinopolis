// components/MoveDirButton.js
import { useState } from 'react';

const MoveDirButton = ({ dirPath }) => {
  const [message, setMessage] = useState('');

  const handleMove = async () => {
    const response = await fetch('/api/moveDir', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dirPath }),
    });

    const text = await response.text(); // Obter a resposta como texto

    try {
      const data = JSON.parse(text); // Tentar analisar o texto como JSON
      setMessage(data.message);
    } catch (error) {
      console.error('Erro ao analisar JSON:', error);
      setMessage('Falha ao analisar a resposta');
    }
  };

  return (
    <div>
      <button onClick={handleMove}>APROVAR</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MoveDirButton;