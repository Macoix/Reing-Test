import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from '.';

const totalPages = 50;
const page = 1;
const setPage = jest.fn();

test('testing pagination', () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(<Pagination totalPages={totalPages} page={page} setPage={setPage}/>);

  const paginationNumber = screen.getByText('1');
  expect(paginationNumber).toBeInTheDocument();

  fireEvent.click(paginationNumber);
  expect(setPage).toHaveBeenCalledTimes(1);
});
