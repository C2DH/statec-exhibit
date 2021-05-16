import { useRef, useState, useEffect } from 'react'
import { StatusIdle, StatusFetching, StatusSuccess, StatusNone, StatusError } from '../constants'
import axios from 'axios'


export const useGetDataset = ({ url, allowCached=true, delay=0}) => {
  const cache = useRef({});
  const [response, setResponse] = useState({
    item: null,
    error: null,
    status: StatusIdle
  });
  console.info('useGetDataset url:', url, 'response', response)

  useEffect(() => {
    let cancelRequest = false
    let timer = null
    if (!url) {
      setResponse({
        item: null,
        error: null,
        status: StatusNone
      });
      return;
    }
    const fetchData = async () => {
      setResponse({
        item: null,
        error: null,
        status: StatusFetching
      });
      if (cache.current[url] && allowCached=== true) {
          console.log('useGetDataset allowCached url:', url)
          const data = cache.current[url];
          data.cached = true;
          if (cancelRequest) return;
          setResponse({
            item: data,
            error: null,
            status: StatusSuccess
          });
      } else {
          console.log('useGetDataset load fresh url:', url)
          return axios.get(url)
            .then(({data}) => {
              cache.current[url] = data // set response in cache;
              if (cancelRequest) return;
              setResponse({
                item: data,
                error: null,
                status: StatusSuccess
              });
            }).catch((err) => {
              if (cancelRequest) return;
              setResponse({
                item: null,
                error: err,
                status: StatusError
              });
            })
      }
    }
    if (delay) {
      timer = setTimeout(() => {
        fetchData()
      }, delay)
    } else {
      fetchData()
    }

    // "If useEffect returns a function, React will run it when it is time to clean up:"
    return function cleanup() {
      cancelRequest = true;
      clearTimeout(timer)
		}
  }, [url, allowCached, delay])
  return response
}
