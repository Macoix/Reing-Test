import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { Hit } from '../../interfaces/hit';
import Card from './index';

const hit: Hit = {
  author: "kelnos",
  created_at: "2022-09-23T00:44:43.000Z",
  objectID: "32946554",
  story_title: "The Framework Laptop Chromebook Edition",
  story_url: "https://frame.work/at/en/blog/introducing-the-framework-laptop-chromebook-edition",
}

const liked = false;

const handleLikeBtn = jest.fn();

test('testing card without like', () => {

  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(<Card hit={hit} handleLikeBtn={handleLikeBtn} liked={liked} />);

  const cardText = screen.getByText(hit.story_title);
  expect(cardText).toBeInTheDocument();

  const heart = screen.getByAltText('unliked');
  expect(heart).toBeInTheDocument();

  fireEvent.click(heart);
  expect(handleLikeBtn).toHaveBeenCalledTimes(1);


});

test('testing card with like', () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(<Card hit={hit} handleLikeBtn={handleLikeBtn} liked={true} />);

  const heart = screen.getByAltText('liked');
  expect(heart).toBeInTheDocument();
});
