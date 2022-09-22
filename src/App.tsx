import React, { ChangeEvent, useEffect, useState } from 'react';
import { validateHits } from './helpers/validateHits';
import { Hit } from './interfaces/hit';
import { FILTERS } from "./const/filters";
import { Filters } from "./interfaces/filters";
import Card from "./components/card";
import Select from "./components/select";

import './assets/styles/app.scss';

function App() {
  const [hits, setHits] = useState<Hit[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [favorites, setFavorites] = useState<Hit[]>([]);
  const [switchValue, setSwitchValue] = useState<string>("all");
  const [currentSelected, setCurrentSelected] = useState("Select your news");

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
          setHits(data.hits.filter((hit) => validateHits(hit)));
        });
    };
    fecthData();
  }, [query, page]);

  const handleSelectChange = (filter: Filters) => {
    localStorage.setItem("filters", filter.value);
    localStorage.setItem("filterName", filter.name);
    setQuery(filter.value);
    setCurrentSelected(filter.name);
  };

  const handleLikeBtn = (hit: Hit) => {
    let fav = JSON.parse(localStorage.getItem("favorites") as string) as Hit[];
    if (!fav) fav = [];

    const find = fav.find((i) => i.objectID === hit.objectID);

    if (find) {
      fav = fav.filter((item) => item.objectID !== hit.objectID);
    } else {
      fav.push(hit);
    }
    setFavorites(fav);
    localStorage.setItem("favorites", JSON.stringify(fav));
  };

  const checkFavorites = (id: string) => {
    return favorites.some((i) => i.objectID === id);
  };

  const handleSwitchEvent = (event: React.MouseEvent<HTMLElement>) => {
    console.log(event.currentTarget.dataset.value)
    setSwitchValue(event.currentTarget.dataset.value as string);
  };

  return (
    <>
      <header className='header'>
          <div className="container">
            <div className="title">Hacker News</div>
          </div>
      </header>

      <div className="tabs">
          <button
            className={`tab-item all ${switchValue === "all" ? "active" : ""}`}
            onClick={handleSwitchEvent}
            data-value="all"
          >
            All
          </button>
          <button
            className={`tab-item myfaves ${switchValue === "myFaves" ? "active" : ""}`}
            onClick={handleSwitchEvent}
            data-value="myFaves"
          >
            My faves
          </button>
      </div>

      <div className="container">
        {switchValue === "all" && (
          <Select
            filters={FILTERS}
            placeholder={currentSelected}
            onChange={handleSelectChange}
          />
        )}
      </div>
      <div className="container">
        <div className="items-wrapper">
          {switchValue === "all" &&
            hits.map((hit, i) => {
              return (
                <Card
                  key={i}
                  hit={{
                    author: hit.author,
                    created_at: hit.created_at,
                    story_title: hit.story_title,
                    story_url: hit.story_url,
                    objectID: hit.objectID
                  }}
                  handleLikeBtn={handleLikeBtn}
                  liked={checkFavorites(hit.objectID)}
                />
              )
          })}
          {switchValue === "myFaves" &&
            favorites.map((fav, i) => (
              <Card
                key={i}
                hit={{
                  author: fav.author,
                  created_at: fav.created_at,
                  story_title: fav.story_title,
                  story_url: fav.story_url,
                  objectID: fav.objectID
                }}
                handleLikeBtn={handleLikeBtn}
                liked={checkFavorites(fav.objectID)}
              />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
