'use client'

// components/Dropzone.js
import { useDropzone } from 'react-dropzone';

const uploadFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch('../', { // Verifique se a URL está correta
    method: 'POST',
    body: formData,
  });


  if (response.ok) {
    alert('PDF files uploaded successfully');
  } else {
    alert('Error uploading PDF files');
  }
};

const Dropzone = () => {
  const onDrop = (acceptedFiles) => {
    uploadFiles(acceptedFiles)
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' });

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>ARRASTE OU SELECIONE ARQUIVOS PDF</p>
    </div>
  );
};

export default Dropzone;