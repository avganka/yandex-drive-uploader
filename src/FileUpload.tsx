import { CSSProperties, useMemo } from 'react';
import {useDropzone} from 'react-dropzone';

interface FileUploadProps {
  onUpload: (files: File[]) => void;
}

const baseStyle: CSSProperties = {
  flexBasis: '500px',
  minHeight: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '15px',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'border 0.3s ease-in-out',
  borderColor: '#ffd242',
  borderStyle: 'solid',
  borderWidth: '10px',
  fontWeight: '700',
  fontSize: '30px',
  lineHeight: '120%',
};

const focusedStyle = {
  borderColor: '#dcb63b',
  borderStyle: 'dashed',
};

const acceptStyle = {
  borderColor: '#376a31',
  borderStyle: 'dashed',
};

const rejectStyle = {
  borderColor: 'red',
  borderStyle: 'dashed',
};

function FileUpload({onUpload}: FileUploadProps) {
  const {getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject} =
    useDropzone({
      onDrop: onUpload,
      maxFiles: 100,
    });

    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );

  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпустите для загрузки</p>
      ) : (
        <p>Перетащите файлы сюда или просто нажмите для выбора</p>
      )}
    </div>
  );
}
export default FileUpload;
