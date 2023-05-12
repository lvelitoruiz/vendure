import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { activeOrderQuery } from '../graphql/queries';
import { Header } from './Header';

const mockCartInfo = {
  activeOrder: {
    code: '123',
    currencyCode: 'USD',
    id: 'abc123',
    lines: [
      {
        __typename: 'OrderLine',
        id: 'line-1',
        productVariant: {
          id: 'variant-1',
          name: 'Product 1',
          sku: 'SKU123',
        },
        unitPriceWithTax: 10,
        quantity: 2,
      },
      {
        __typename: 'OrderLine',
        id: 'line-2',
        productVariant: {
          id: 'variant-2',
          name: 'Product 2',
          sku: 'SKU456',
        },
        unitPriceWithTax: 20,
        quantity: 1,
      },
    ],
    state: 'Active',
    total: 40,
  },
};

const mocks = [
  {
    request: {
      query: activeOrderQuery,
    },
    result: {
      data: mockCartInfo,
    },
  },
];

describe('Header component', () => {
  it('renders the header with the correct title', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header />
      </MockedProvider>
    );

    const title = screen.getByText('santex');
    expect(title).toBeInTheDocument();
  });

  it('displays the cart when the cart button is clicked', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header />
      </MockedProvider>
    );

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);

    const cart = screen.getByTestId('cart-button-child');
    expect(cart).toBeInTheDocument();
  });

  it('hides the cart when the cart button is clicked twice', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header />
      </MockedProvider>
    );

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);
    fireEvent.click(cartButton);

    const cart = screen.queryByTestId('cart');
    expect(cart).not.toBeInTheDocument();
  });
});
