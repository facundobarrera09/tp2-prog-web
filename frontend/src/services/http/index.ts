import { AxiosRequestConfig } from "axios";
import post from "./post";
import objectAttributesToBigInt from "../../utils/objectAttributesToBigInt";
import get from "./get";

export const axiosConfig: AxiosRequestConfig = {
    headers: {
        "Content-Type": "application/json"
    },
    transformResponse: [
        (data) => JSON.parse(data),
        objectAttributesToBigInt
    ]
}

const httpService = {
    post,
    get
}

export default httpService