import React from 'react';
import { Filter } from '../../interfaces/filters';
import { render, fireEvent } from '@testing-library/react';
import Select from './index';

const onChange = jest.fn();

const filters: Filter[] = [{
  name: 'Vue',
  value: 'vuejs'
}]

const placeholder = 'Select your news';

test('testing select', () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(<Select filters={filters} placeholder={placeholder} onChange={onChange}/>);

  const select = screen.getByText(placeholder);

  expect(select).toBeInTheDocument();
});

test('testing options', () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(<Select filters={filters} placeholder={placeholder} onChange={onChange}/>);

  const option = screen.getByText('Vue');

  expect(option).toBeInTheDocument();
});

test('testing click', () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const screen = render(<Select filters={filters} placeholder={placeholder} onChange={onChange}/>);

  const option = screen.getByText('Vue');

  fireEvent.click(option);

  expect(onChange).toHaveBeenCalledTimes(1);
});
