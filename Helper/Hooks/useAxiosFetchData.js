import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://impartial-picturesque-page.glitch.me/';

const useAxiosFetchData = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [body, headers, method, url]);

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers, fetchData]);

  return { response, error, loading };
};

export default useAxiosFetchData;
