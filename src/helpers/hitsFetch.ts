/**
 * Fetch the hits from the API and filter by some conditions
 *
 * And returns a object { hits, error, hitsPerPage, totalPages, loading}
 */
/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback, useEffect, useState } from 'react';
import { Hit } from '../interfaces/hit';
import { validateHits } from './validateHits';

function hitFetch (query: string, page: number) {

  const [hits, setHits] = useState<Hit[]>([]);
  const [error, setError] = useState(false);
  const [hitsPerPage, setHitsPerPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const sendQuery = useCallback(() => {
    setLoading(true);
    fetch(
      `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
    )
      .then((response) => response.json())
      .then((data: { hits: Hit[], hitsPerPage: number, nbPages: number }) => {
        setHitsPerPage(data.hitsPerPage);
        setTotalPages(data.nbPages);
        setHits(data.hits.filter((hit) => validateHits(hit)));
        setLoading(false);
      });
  }, [query, page]);

  useEffect(() => {
    sendQuery();
  }, [query, sendQuery, page]);

  return { hits, error, hitsPerPage, totalPages, loading };
}

export default hitFetch;
