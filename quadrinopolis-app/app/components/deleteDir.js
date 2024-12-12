// components/DeleteDirButton.js
import { useState } from 'react';

const DeleteDirButton = ({ dirPath }) => {
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    const response = await fetch('/api/deleteDir', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dirPath }),
    });

    const text = await response.text(); // Get the response as text
    console.log(text); // Log the raw response

    try {
      const data = JSON.parse(text); // Try to parse the text as JSON
      setMessage(data.message);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setMessage('Failed to parse response');
    }

    window.location.reload(); 
  };

  return (
    <div>
      <button onClick={handleDelete} className="botao-rejeitar">REPROVAR</button>
    </div>
  );
};

export default DeleteDirButton;