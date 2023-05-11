import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { activeOrderQuery } from "../graphql/queries";
import { Header } from "./Header";

describe("Header component", () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: activeOrderQuery,
      },
      result: {
        data: {
          activeOrder: {
            code: "123",
            currencyCode: "USD",
            id: "abc",
            lines: [
              {
                __typename: "OrderLine",
                id: "line1",
                productVariant: {
                  // add mock productVariant data here
                },
                unitPriceWithTax: 10,
                quantity: 2,
              },
            ],
            state: "Open",
            total: 20,
          },
        },
      },
    },
  ];

  beforeEach(() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Header />
      </MockedProvider>
    );
  });

  test("renders the Santex logo", () => {
    const logo = screen.getByText(/santex/i);
    expect(logo).toBeInTheDocument();
  });

  test("renders the cart button", () => {
    const cartButton = screen.getByTestId('cart-button');
    expect(cartButton).toBeInTheDocument();
  });

  test("opens and closes the cart when the cart button is clicked", async () => {
    const cartButton = screen.getByTestId('cart-button');

    fireEvent.click(cartButton);
    const cart = await waitFor(() => screen.getByTestId("cart-button-child"));
    expect(cart).toBeInTheDocument();

    fireEvent.click(cartButton);
    await waitFor(() => {
      expect(cart).not.toBeInTheDocument();
    });
  });

  test("renders the cart with the correct total and items", async () => {
    const cartButton = screen.getByTestId('cart-button');

    fireEvent.click(cartButton);
    const cart = await waitFor(() => screen.getByTestId("cart-button-child"));

    const subtotalPrice = screen.getByText("Subtotal");
    expect(subtotalPrice).toBeInTheDocument();

    const productTitle = screen.getByText("Grand total");
    expect(productTitle).toBeInTheDocument();
  });
});

