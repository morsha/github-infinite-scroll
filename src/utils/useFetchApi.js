import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import qs from 'qs';
import axios from 'axios';
import uniqBy from 'lodash/uniqBy';
import { FETCH_LIMIT } from '../constant';

const GITHUB_API_DOMAIN = 'https://api.github.com';

async function fetchGithubApi(url) {
  try {
    const { data } = await axios({
      method: 'GET',
      url: `${GITHUB_API_DOMAIN}${url}`,
    });

    return data;
  } catch (e) {
    throw new Error('API Failed');
  }
}

function useFetchApi(url, searchTerm) {
  const timer = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async (queryString) => {
    try {
      const apiData = await fetchGithubApi(`${url}${queryString}`);

      if (apiData.items.length < FETCH_LIMIT) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      return apiData;
    } catch (e) {
      setError(e);

      return null;
    }
  }, [url]);

  const fetchApiFn = useCallback(async () => {
    setError(null);
    setData([]);
    setHasMore(true);

    if (!searchTerm) return;

    const queryString = qs.stringify({
      q: searchTerm,
      per_page: FETCH_LIMIT,
      page: 1,
    }, {
      addQueryPrefix: true,
    });

    setLoading(true);

    const fetchedData = await fetchData(queryString);

    if (fetchedData) {
      setData(fetchedData.items);

      setPage(1);
    }

    setLoading(false);
  }, [fetchData, searchTerm]);

  const fetchMore = useCallback(async () => {
    if (!hasMore) return;

    setError(null);

    const queryString = qs.stringify({
      q: searchTerm,
      per_page: FETCH_LIMIT,
      page: page + 1,
    }, {
      addQueryPrefix: true,
    });

    setLoading(true);

    const fetchedData = await fetchData(queryString);

    if (fetchedData) {
      if (fetchedData.items.length) {
        const newDataList = uniqBy([
          ...data,
          ...fetchedData.items,
        ], item => item.id);

        if (newDataList.length !== data.length) {
          setData(newDataList);

          setPage(p => p + 1);
        }
      }
    }

    setLoading(false);
  }, [data, fetchData, hasMore, page, searchTerm]);

  useEffect(() => {
    if (error) {
      timer.current = setTimeout(() => {
        setError(null);
      }, 60000);

      return () => {
        clearTimeout(timer.current);
      };
    }

    return () => {};
  }, [error]);

  return [fetchApiFn, {
    data, loading, error, hasMore, fetchMore,
  }];
}

export default useFetchApi;
