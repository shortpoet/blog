import axios, { AxiosRequestConfig } from 'axios'
import { colorLog } from '../../utils/colorLog'
import { chalkLog } from '../../utils/chalkLog';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  console.log('intercept before');

  // Do something before request is sent
  // console.log(config);
  // console.log(config.validateStatus(200));
  // console.log(config.validateStatus(500));


  return config;
}, function (error) {
  console.log('intercept after');
  // Do something with request error
  console.log(error);

  return Promise.reject(error);
});

// query type corresponds to key for redis cache
export const graphAxios
  = async (query: any, queryType?: string): Promise<any> => {
    // chalkLog('green', 'graphAxios')
    query = { query: query }
    const config: AxiosRequestConfig = {
      validateStatus: (status) => status < 500
    }
    config.params = queryType ? { queryType: queryType } : null
    // const url = `${import.meta.env.VITE_APP_API ? import.meta.env.VITE_APP_API : process.env.VUE_APP_API}/graphql`
    // const base = `${process.env.VUE_APP_API_BASE}`
    const port = process.env.VUE_APP_API_PORT
    

    const url = `${process.env.VUE_APP_API}/graphql`
    console.log(url);
    
    try {
      const res = await axios.post(
        url,
        query,
        config
      )
      // chalkLog('green', 'graphAxios')
      // chalkLog('blueBright', res)
      // chalkLog('green', res.status)
      console.log(res);
      // console.log(res.status);
      
      if (res.status == 200) {
        // chalkLog('green', "Graph Axios OK")
        // colorLog("Graph Axios OK", 1);
        // console.log(res);
        return res.data.data
      }
      
      if (res.status == 500) {
        // defaults to 0
        colorLog("Graph Axios NOT OK", new Number().valueOf());
        return res
      }

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log(`Error when fetching: ${error.message}`);
      }
      console.log(error.config);
    }
  };

export const graphFetch
  = async (url: string, query: string): Promise<any> => {
    try {
      const result = await window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: query
        })
      })
      return await result.json();
    } catch (error) {
      console.log(`Error when fetching: ${error}`);
    }
  };
