import { describe, expect, it, vi} from 'vitest';
import { uploadFile } from '../utils';
import { toast } from 'react-toastify';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);
const mockUrl = 'https://mock-url';

mock.onGet('https://cloud-api.yandex.net/v1/disk/resources/upload').reply(200, {
  href: mockUrl,
});

mock.onPut(mockUrl).reply(201);

vi.mock('react-toastify', () => ({
  toast: {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    update: vi.fn(),
  },
}));
describe('uploadFile', () => {
  it('успешная загрузка файла и нотификация', async () => {
    const file = new File(['file content'], 'test.txt', {
      type: 'text/plain',
    });

    const status = await uploadFile(file, 'test-token');

    expect(status).toBe(201);
    expect(toast.info).toHaveBeenCalledWith('test.txt загрузка 0%', expect.anything());
    expect(toast.success).toHaveBeenCalledWith('Файл test.txt успешно загружен!');
  });

  it('показать ошибку при неудачной отпарвке', async () => {
    mock.onPut(mockUrl).networkError();

    const file = new File(['file content'], 'test.txt', {
      type: 'text/plain',
    });

    await uploadFile(file, 'test-token');

    expect(toast.error).toHaveBeenCalledWith('Не удалось загрузить test.txt');
  });
});
