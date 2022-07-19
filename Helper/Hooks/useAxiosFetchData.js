import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://impartial-picturesque-page.glitch.me/';

const useAxiosFetchData = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    axios[method](url, JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        console.log(err);

        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [body, method, url]);

  useEffect(() => {
    fetchData();
    //console.log('Fetch Data From Url : ' + url);
  }, [method, url, body, headers, fetchData]);

  return { response, error, loading };
};

export default useAxiosFetchData;
