import axios from "axios";

export const UTILS = {
    setAuthHeader: token => {
        axios.interceptors.request.use(request => {
            if (!request.headers.Authorization) {
                request.headers.Authorization = "Bearer " + token;
            }
            return request;
        });
    }
};
