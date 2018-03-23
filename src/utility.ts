import {ChartDrawRequest} from './interfaces';
import _ from 'lodash';

function ceilingN(x: number, n: number) {
    return Math.ceil(x / n) * n;
}

function floorN(x: number, n: number) {
    return Math.floor(x / n) * n;
}

const functions = {
    getChartDrawRequest(data: any[]): ChartDrawRequest {
        const result = {
            data: data,
            xTitle: "Something",
            yTitle: "Something else"
        };

        return result;
    },
    // This is taken from the Axios docs.  Should be ported to loglevel
    handleAxiosError(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an 
            // Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    },
};

export default functions;
