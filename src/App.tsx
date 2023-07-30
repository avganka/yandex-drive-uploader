import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileUpload from './FileUpload';
import {uploadFile} from './utils';

function App() {
  const onUpload = async (files: File[]) => {
    files.forEach(async (file) => {
      await uploadFile(file, import.meta.env.VITE_YANDEX_DISK_TOKEN);
    });
  };

  return (
    <div className='container'>
      <ToastContainer />
      <FileUpload onUpload={onUpload} />
    </div>
  );
}

export default App;
