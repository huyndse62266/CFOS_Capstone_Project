import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { AsyncStorage } from 'react-native';
let token = '';
class Service {
  getToken = async () => {
    try {
      token = await AsyncStorage.getItem('TOKEN');
    } catch (error) {}
  };
  getRestClient() {
    // create instance
    if (!this.serviceInstance) {
      this.serviceInstance = axios.create({
        baseURL: 'http://103.79.143.240:8080/api/',
        timeout: 1000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      this.getToken();
      // Set the AUTH token for any request
      this.serviceInstance.interceptors.request.use(config => {
        config.headers.Authorization = token ? `${token}` : '';
        return config;
      });
    }
    return this.serviceInstance;
  }
}

export default new Service();
