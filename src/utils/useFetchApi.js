import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import qs from 'qs';
import uniqBy from 'lodash/uniqBy';
import {
  FETCH_LIMIT,
  FETCH_RATE_LIMITS,
} from '../constant';
import fetchGithubApi from './fetchGithubApi';

function useFetchApi(url, searchTerm) {
  const timer = useRef();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [retrySeconds, setRetrySeconds] = useState(null);

  const fetchData = useCallback(async (variables) => {
    try {
      const queryString = qs.stringify({
        q: searchTerm,
        per_page: FETCH_LIMIT,
        ...variables,
      }, {
        addQueryPrefix: true,
      });

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
  }, [searchTerm, url]);

  const fetchApiFn = useCallback(async () => {
    setError(null);
    setData([]);
    setHasMore(true);

    if (!searchTerm) return;

    setLoading(true);

    const fetchedData = await fetchData({
      page: 1,
    });

    if (fetchedData) {
      setData(fetchedData.items);

      setPage(1);
    }

    setLoading(false);
  }, [fetchData, searchTerm]);

  const fetchMore = useCallback(async () => {
    if (!hasMore) return;

    setError(null);

    setLoading(true);

    const fetchedData = await fetchData({
      page: page + 1,
    });

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
  }, [data, fetchData, hasMore, page]);

  const fetchResetMs = useCallback(async () => {
    const rateData = await fetchGithubApi(FETCH_RATE_LIMITS);

    if (rateData) {
      const resetTime = rateData.resources.search.reset;

      const msLeft = (resetTime * 1000) - new Date().valueOf() + 1000;

      setRetrySeconds(parseInt(msLeft / 1000, 10));

      timer.current = setTimeout(() => {
        setError(null);
        setRetrySeconds(null);
      }, msLeft);
    } else {
      setRetrySeconds(60);

      timer.current = setTimeout(() => {
        setError(null);
        setRetrySeconds(null);
      }, 60000);
    }
  }, []);

  useEffect(() => {
    if (error) {
      fetchResetMs();
    }

    return () => {
      timer.current = null;
    };
  }, [error, fetchResetMs]);

  return [fetchApiFn, {
    data, loading, error, hasMore, fetchMore, retrySeconds,
  }];
}

export default useFetchApi;
