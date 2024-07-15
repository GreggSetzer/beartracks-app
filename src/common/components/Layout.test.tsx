import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Layout from './Layout';

// Mock the Header component
jest.mock('./Header', () => {
  return function DummyHeader() {
    return <div data-testid="header">Header</div>;
  };
});

describe('Layout', () => {
  const setup = () => {
    return render(
      <Layout>
        <div data-testid="child-content">Child content</div>
      </Layout>
    );
  };

  test('renders successfully', () => {
    setup();

    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  test('renders the Header component', () => {
    setup();

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    setup();

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  test('applies the mainClassName prop to the main element', () => {
    const mainClassName = 'custom-main-class';
    render(
      <Layout mainClassName={mainClassName}>
        <div>Child content</div>
      </Layout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass(mainClassName);
  });
});
