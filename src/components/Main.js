// @flow

import React, {
  useEffect,
} from 'react';
import {
  useParams,
} from 'react-router-dom';
import Header from './Header';
import InfiniteScroll from './InfiniteScroll';
import LoadingSpinner from './LoadingSpinner';
import {
  FETCH_SEARCH_REPOS,
} from '../constant';
import useFetchApi from '../utils/useFetchApi';
import './main.scss';

function Main() {
  const {
    searchTerm,
  } = useParams();

  const [fetchApi, {
    data,
    loading,
    error,
    hasMore,
    fetchMore,
    retrySeconds,
  }] = useFetchApi(FETCH_SEARCH_REPOS, searchTerm);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  return (
    <main className="main">
      <Header />
      {searchTerm && (
        <InfiniteScroll
          dataList={data}
          fetchMore={fetchMore}
          hasMore={hasMore}
          error={error}
          loading={loading} />
      )}
      {error && retrySeconds ? (
        <div className="placeholder">
          API limit is up, plz wait
          <LoadingSpinner countDown={retrySeconds} />
        </div>
      ) : null}
      {!hasMore ? (
        <p className="placeholder">
          No more data
        </p>
      ) : null}
    </main>
  );
}

export default Main;
