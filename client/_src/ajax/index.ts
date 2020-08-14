import axios from 'axios'

export const graphAxios
  = async (query: string): Promise<any> => {
    try {
      const res = await axios.post('http://localhost:5000/graphql', {
        query: query
      });
      return res.data.data
    } catch (error) {
      console.log(`Error when fetching: ${error}`);
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
