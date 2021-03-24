"use strict";

import Vue, {PluginObject} from 'vue';
import axios from "axios";

const config = {

};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

const plugin: PluginObject<any> = new class implements PluginObject<any> {
    [key: string]: any;

    install(vue: typeof Vue, options: any): void {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        Vue["axios"] = _axios;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window["axios"] = _axios;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        Object.defineProperties(Vue["prototype"], {
            axios: {
                get() {
                    return _axios;
                }
            },
            $axios: {
                get() {
                    return _axios;
                }
            },
        });
    }
};

Vue.use(plugin)

export default plugin;
