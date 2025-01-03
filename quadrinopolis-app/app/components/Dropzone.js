'use client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ className }) => {
  const [imageFiles, setImageFiles] = useState([])
  const [pdfFiles, setPdfFiles] = useState([])
  const [titulo, setTitulo] = useState('')
  const [sinopse, setSinopse] = useState('')
  const [rejected, setRejected] = useState([])

  const onImageDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      const renamedFiles = acceptedFiles.map(file => {
        // Renomeia o arquivo para "imagem_fixa.jpg"
        return new File([file], 'capa.jpg', { type: file.type });
      });

      setImageFiles(previousFiles => [
        ...previousFiles,
        ...renamedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const onPdfDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setPdfFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1000, // 1 MB
    maxFiles: 1,
    onDrop: onImageDrop
  })

  const { getRootProps: getPdfRootProps, getInputProps: getPdfInputProps, isDragActive: isPdfDragActive } = useDropzone({
    accept: {
      'application/pdf': []
    },
    maxSize: 1024 * 1000 * 100, // 1 MB
    maxFiles: 1,
    onDrop: onPdfDrop
  })

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      imageFiles.forEach(file => URL.revokeObjectURL(file.preview))
      pdfFiles.forEach(file => URL.revokeObjectURL(file.preview))
    }
  }, [imageFiles, pdfFiles])

  const removeFile = (name, type) => {
    if (type === 'image') {
      setImageFiles(files => files.filter(file => file.name !== name))
    } else if (type === 'pdf') {
      setPdfFiles(files => files.filter(file => file.name !== name))
    }
  }

  const removeAll = () => {
    setImageFiles([])
    setPdfFiles([])
    setRejected([])
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Permitir envio mesmo que não haja imagem
    if (!pdfFiles.length || !titulo || !sinopse) return

    const formData = new FormData()
    if (imageFiles.length) {
      imageFiles.forEach(file => formData.append('image', file))
    }
    pdfFiles.forEach(file => formData.append('pdf', file))
    formData.append('titulo', titulo)
    formData.append('sinopse', sinopse)

    const data = await fetch('../api/upload', {
      method: 'POST',
      body: formData
    })

    window.location.reload(); 
  }

  return (
    <form onSubmit={handleSubmit}>
      

      <div className="mt-4">
        <label htmlFor="titulo" className="">Título:</label>
        <textarea
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className=""
        />
      </div>

      <div className="">
        <label htmlFor="sinopse" className="">Sinopse:</label>
        <textarea
          id="sinopse"
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          required
          className=""
        />
      </div>


      <div
        {...getImageRootProps({
          className: className
        })}
      >
        <input {...getImageInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          {isImageDragActive ? (
            <p>CLIQUE OU ARRASTE A IMAGEM AQUI ...</p>
          ) : (
            <p>LARGUE A IMAGEM AQUI (opcional)</p> // Indica que a imagem é opcional
          )}
        </div>
      </div>

      <div
        {...getPdfRootProps({
          className: className
        })}
      >
        <input {...getPdfInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          {isPdfDragActive ? (
            <p>CLIQUE OU ARRASTE O PDF AQUI ...</p>
          ) : (
            <p>LARGUE O PDF AQUI (obrigatório)</p> // Indica que o PDF é obrigatório
          )}
        </div>
      </div>

      <section className='mt-10'>
        <button
            type='button'
            onClick={removeAll}
            className='uppercase text-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:bg-purple-400 transition-colors'
          >
            Remover todos os arquivos
          </button>
          
        <h2 className='title text-3xl font-semibold'>Arquivos selecionados</h2>

        {/* Accepted files */}
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {imageFiles.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg display:inline-block'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full object-contain rounded-md'
              />
            </li>
          ))}
          {pdfFiles.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <div className='h-full w-full flex items-center justify-center bg-gray-200 rounded-md'>
                <p className='text-500 text-[12px] font-medium' >{file.name}</p>
              </div>
            </li>
          ))}
        </ul>
        <li className='h-32 shadow-lg'>
            <button
              type='submit'
              className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
            >
              Enviar
            </button>
            </li>
      </section>
    </form>
  )
}

export default Dropzone;