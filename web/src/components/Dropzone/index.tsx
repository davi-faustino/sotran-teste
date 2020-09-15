import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import Swal from 'sweetalert2'

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props>  = ({ onFileUploaded }) => {
  const [selectedFilename, setSelectedFilename] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    if(!file) {
      return Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Formato de arquivo invalido!', 
        timer: 1500,
        showConfirmButton: true
      });
    };

    setSelectedFilename(file.name);
    onFileUploaded(file);
  }, [onFileUploaded]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: '.csv'
  });

  return (
    <div className="dropzone" {...getRootProps()} >
      <input {...getInputProps()} accept=".csv" />
      <p>
        <FiUpload />
        {selectedFilename
          ? selectedFilename
          : (
            'Dados de motoristas (apenas arquivos .csv)'
          )}
      </p>
    </div>
  );
}

export default Dropzone;