import { useRef, useState, useEffect } from 'react'
import { StatusIdle, StatusFetching, StatusSuccess, StatusNone, StatusError } from '../constants'
import axios from 'axios'
import { bisectLeft } from 'd3-array'

export const getClosestDatumIdxFromX = ({x, xValues }) => {
  const insertIdx = parseInt(bisectLeft(xValues, x), 10)
  const closestDatumIdx = insertIdx === 0
      ? 0
      : (
        Math.abs(x - xValues[insertIdx]) >  Math.abs(x - xValues[insertIdx - 1])
        ? insertIdx - 1
        : insertIdx
      )
  return closestDatumIdx
}

export const getClosestDatumIdxFromXY = ({x, y, xValues, yValues, radiusIdx = 5}) => {
  const insertIdx = parseInt(bisectLeft(xValues, x), 10)
  const closestDatumIdx = insertIdx === 0
      ? 0
      : (
        Math.abs(x - xValues[insertIdx]) >  Math.abs(x - xValues[insertIdx - 1])
        ? insertIdx - 1
        : insertIdx
      )
  // around the radius of x items
  let closestInsertIdx = Math.max(0, closestDatumIdx - radiusIdx)
  for (let i = Math.max(0, closestDatumIdx - radiusIdx); i < Math.min(closestDatumIdx + radiusIdx, xValues.length); i++) {
    closestInsertIdx = Math.abs(y - yValues[i]) >  Math.abs(y - yValues[closestInsertIdx])
      ? closestInsertIdx
      : i
  }
  return closestInsertIdx
}


export const useGetDataset = ({ url, allowCached=true, delay=0}) => {
  const cache = useRef({});
  const [response, setResponse] = useState({
    item: null,
    error: null,
    status: StatusIdle
  });
  console.debug('[useGetDataset] url:', url, 'response', response)

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
          console.debug('[useGetDataset] allowCached url:', url)
          const data = cache.current[url];
          data.cached = true;
          if (cancelRequest) return;
          setResponse({
            item: data,
            error: null,
            status: StatusSuccess
          });
      } else {
          console.debug('[useGetDataset] load fresh url:', url)
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
