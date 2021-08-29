// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import { useDebounce } from 'use-debounce';

function Header() {
  const history = useHistory();

  const {
    searchTerm = '',
  } = useParams();

  const [typed, setTyped] = useState(searchTerm || '');
  const [searchState, setSearchState] = useState(searchTerm || '');
  const [debouncedSearchState] = useDebounce(searchState, 500);

  useEffect(() => {
    history.push(`/${debouncedSearchState || ''}`);
  }, [debouncedSearchState, history]);

  useEffect(() => {
    setTyped(searchTerm);
  }, [searchTerm]);

  return (
    <div className="header">
      <input
        type="text"
        className="search-input"
        value={typed}
        onChange={(e) => {
          setTyped(e.target.value || '');
          setSearchState(e.target.value || '');
        }} />
    </div>
  );
}

export default React.memo(Header);
