import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://impartial-picturesque-page.glitch.me/';

const useAxiosSetData = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendData = () => {
    setLoading(true);
    console.log('Data Send Via ' + url + ' Body' + body);
    axios[method](url, JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { response, error, loading, sendData };
};

export default useAxiosSetData;
