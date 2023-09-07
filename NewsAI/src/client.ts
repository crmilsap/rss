import {ApiClient} from './generated-api';

export const apiClient = new ApiClient({
  BASE: 'http://localhost:8080', // todo dotenv
});
