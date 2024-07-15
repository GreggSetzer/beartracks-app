import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GenericError from './GenericError';

describe('GenericError', () => {
  test('should render', () => {
    render(
      <BrowserRouter>
        <GenericError />
      </BrowserRouter>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
