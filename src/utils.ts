import axios from 'axios';
import {toast} from 'react-toastify';

export const uploadFile = async (file: File, token: string) => {
  try {
    const {data} = await axios.get('https://cloud-api.yandex.net/v1/disk/resources/upload', {
      headers: {
        Authorization: `OAuth ${token}`,
      },
      params: {
        path: file.name,
        overwrite: 'true',
      },
    });

    const uploadUrl = data.href;

    const toastId = toast.info(`${file.name} загрузка 0%`, {
      progress: 0,
      autoClose: false,
    });

    const formData = new FormData();
    formData.append('file', file);

    const uploadResponse = await axios.put(uploadUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 100)
        );
        toast.update(toastId, {
          progress: percentCompleted / 100,
          render: `${file.name} загрузка ${percentCompleted}%`,
        });
      },
    });

    if (uploadResponse.status === 201) {
      toast.success(`Файл ${file.name} успешно загружен!`);
    }

    return uploadResponse.status;
  } catch (error) {
    toast.error(`Не удалось загрузить ${file.name}`);
  }
};
