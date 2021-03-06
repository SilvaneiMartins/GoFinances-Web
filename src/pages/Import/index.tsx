/*
* Desenvolvedor: Silvanei Martins;
* Email: silvaneimartins_rcc@hotmail.com;
* WhatsApp: (69) 9.8405-2620;
* Desafio 07: GoFinances Web;
*/
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    const arquivos: FormData[] = [];
    uploadedFiles.forEach(async uploadedFile => {
      const data = new FormData();
      data.append('file', uploadedFile.file, uploadedFile.name);
      arquivos.push(data);
    });
    try {
      await Promise.all([
        arquivos.map(arquivo => api.post('/transactions/import', arquivo)),
      ]);
      setUploadedFiles([]);
    } catch (e) {
      console.log(e.response.error);
    }
    history.push('/');
  }

  function submitFile(files: File[]): void {
    const newFiles: FileProps[] = files.map(file => {
      const newFile: FileProps = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };
      return newFile;
    });
    setUploadedFiles([...uploadedFiles, ...newFiles]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
