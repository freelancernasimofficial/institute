import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (dataUrl,urlparams=null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState("LOADING");

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
     
      try {
        const response = await axios.get(url, {
          params: urlparams,
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data || []);
          setError(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData([]);
        }
      } finally {
        isMounted && setStatus("OK");
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUrl]);

  const refetch = () => {
       setStatus("LOADING");
    setData([])
    axios
      .get(dataUrl, { params: urlparams })
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        setStatus("ERROR");
        setError(err);
      })
      .finally(() => {
        setStatus("OK");
      });
  };

  return { data, status, error, refetch };
};

export default useFetch;
