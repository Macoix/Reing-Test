import React, { ChangeEvent, useEffect, useState } from 'react';
import { validateHits } from './helpers/validateHits';
import { Hit } from './interfaces/hit';
import { FILTERS } from "./const/filters";
import { Filters } from "./interfaces/filters";

function App() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const filter = localStorage.getItem("filters")
      ? localStorage.getItem("filters")
      : "";
    setQuery(filter as string);
  }, []);

  useEffect(() => {
    const fecthData = () => {
      fetch(
        `https://hn.algolia.com/api/v1/search_by_date?query=${query}&page=${page}`
      )
        .then((response) => response.json())
        .then((data: { hits: Hit[] }) => {
          console.log(data.hits.filter((hit) => validateHits(hit)))
          setHits(data.hits.filter((hit) => validateHits(hit)));
        });
    };
    fecthData();
  }, [query, page]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
    localStorage.setItem("filters", event.target.value);
    setQuery(event.target.value);
  };
  return (
    <>
      <select name="filter" id="filter" onChange={handleSelectChange}>
        {FILTERS.map((item, idx) => {
         return <option key={idx} value={item.value}>{item.value}</option>
        })}
      </select>

      {
        hits.map(hit => hit.author)
      }
    </>
  );
}

export default App;
