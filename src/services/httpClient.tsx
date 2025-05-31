import axios from "axios";

// config http package
let config: any = {
    headers: {
        'Content-Type': 'application/json, text/html',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('token')
    },
    responseType: 'json',
    withCredentials: true
};

//let URL = process.env.REACT_APP_API_URL;
let URL = "http://localhost:5210/api/";

// method GET
const httpGet = async (endpoint: string, param?: any) => {
    if (endpoint === "" || endpoint === null || endpoint === undefined)
        return new Promise((reject) => {
            reject({ message: "parameter is required" })
        });

    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    return axios.get(URL + endpoint, config)
}

// method POST
const httpPost = async (endpoint: string, param?: any) => {
    if (endpoint === "" || endpoint === null || endpoint === undefined)
        return new Promise((reject) => {
            reject({ message: "parameter is required" })
        });
    config.headers['Authorization'] = localStorage.getItem('token');
    return axios.post(URL + endpoint, param, config);
}

export { httpGet, httpPost }