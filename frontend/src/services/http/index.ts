import { AxiosRequestConfig } from "axios";
import post from "./post";
import objectAttributesToBigInt from "../../utils/objectAttributesToBigInt";
import get from "./get";

// @ts-ignore
// Allow for BigInt JSON serialization
BigInt.prototype["toJSON"] = function () { 
    return this.toString() + "n"
}


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