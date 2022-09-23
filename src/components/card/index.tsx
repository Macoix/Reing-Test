import React from "react";
import { Hit } from "../../interfaces/hit";
import { timeSince } from "../../helpers/timeSince";
import emptyHeart from "../../assets/imgs/empty-heart.svg";
import fullyHeart from "../../assets/imgs/fully-heart.svg";
import clock from "../../assets/imgs/clock.svg";

interface cardProps {
  hit: Hit;
  handleLikeBtn: Function;
  liked: boolean;
}

const Card = ({ hit, handleLikeBtn, liked }: cardProps) => {
  return (
    <div className="itemCard">
      <a
        className="itemCard__link"
        href={hit.story_url}
        target="_blank"
        rel="noreferrer"
      >
        <div className="itemTime">
          <img src={clock} alt="clock" />
          {timeSince(hit.created_at)} by {hit.author}
        </div>
        <div className="itemTitle">{hit.story_title}</div>
      </a>
      <div className="itemLike" onClick={() => handleLikeBtn(hit)}>
        {liked ? (
          <img src={fullyHeart} alt="liked" />
        ) : (
          <img src={emptyHeart} alt="unliked" />
        )}
      </div>
    </div>
  );
};

export default Card;
