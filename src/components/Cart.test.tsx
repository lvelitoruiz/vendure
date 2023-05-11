import { render, screen } from '@testing-library/react';
import Cart from './Cart';

describe('Cart', () => {
  const mockItems = [
    {
      featuredAsset: {
        preview: 'https://example.com/image.jpg',
      },
      productVariant: {
        name: 'Product A',
      },
      quantity: 2,
      linePrice: 40,
    },
    {
      featuredAsset: {
        preview: 'https://example.com/image.jpg',
      },
      productVariant: {
        name: 'Product B',
      },
      quantity: 1,
      linePrice: 20,
    },
  ];

  it('renders cart items and total price', () => {
    const total = mockItems.reduce((acc, item) => acc + item.linePrice, 0);
    render(<Cart items={mockItems} total={total} />);

    mockItems.forEach((item) => {
      const productName = screen.getByText(item.productVariant.name);
      expect(productName).toBeInTheDocument();

      const quantity = screen.getByText(item.quantity.toString());
      expect(quantity).toBeInTheDocument();

      const linePrice = screen.getByText(`$${item.linePrice}`);
      expect(linePrice).toBeInTheDocument();
    });

    const subtotal = screen.getByText(`Subtotal`);
    expect(subtotal).toBeInTheDocument();

    const grandTotal = screen.getByText(`Grand total`);
    expect(grandTotal).toBeInTheDocument();
  });

  it('renders "No hay elementos" message if no items are provided', () => {
    render(<Cart items={null} total={0} />);
    const noElementsMessage = screen.getByText('No hay elementos');
    expect(noElementsMessage).toBeInTheDocument();
  });
});
