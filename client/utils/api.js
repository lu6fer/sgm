import axios from 'axios';
import Promise from 'promise';

class ApiManager {
    constructor() {
        if (!this._api) {
            this._api = axios.create({
                baseURL: (typeof window === 'undefined' || process.env.NODE_ENV === 'test') ?
                    process.env.BASE_URL || (`http://localhost:${process.env.PORT || '3000'}/api`) :
                    '/api',
                timeout: 1000,
                validateStatus: (status) => (
                    status >= 200 && status < 423
                )
            });

            this._api.interceptors.response.use(
                (response) => {
                    // Reject promise if api return error true
                    if (response.data.error) {
                        return Promise.reject(response);
                    }

                    return response;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            /* this._api.interceptors.request.use(
              (config) => {
                const token = getToken();
                if (token) {
                  config.headers['authorization'] = `Bearer ${token}`;
                }

                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                config.headers['Expires'] = '-1';
                config.headers['Cache-Control'] = "no-cache,no-store,must-revalidate,max-age=-1,private";

                return config;
              },
              (error) => Promise.reject(error)
            ); */
        }

        return this._api;
    }
}


const Api = new ApiManager();
export default Api;
