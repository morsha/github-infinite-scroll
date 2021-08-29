// @flow

import React, {
  useRef,
  useCallback,
} from 'react';
import ScrollItem from './ScrollItem';
import LoadingSpinner from '../LoadingSpinner';

type Props = {
  dataList: Array,
  fetchMore: Function,
  hasMore: Boolean,
  error?: Object,
  loading: Boolean,
}

function InfiniteScroll({
  dataList,
  fetchMore,
  hasMore,
  error,
  loading,
}: Props) {
  const observerRef = useRef();

  const setObserver = useCallback((node) => {
    if (loading) {
      return;
    }

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !error) {
        fetchMore();
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [error, fetchMore, hasMore, loading]);

  return (
    <div className="infinite-scroll">
      {dataList.map(data => (
        <ScrollItem
          key={data.id}
          itemData={data} />
      ))}
      <div className="observer" ref={setObserver} />
      {loading ? (
        <LoadingSpinner />
      ) : null}
    </div>
  );
}

InfiniteScroll.defaultProps = {
  error: null,
};

export default React.memo(InfiniteScroll);
