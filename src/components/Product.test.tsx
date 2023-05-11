import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';

describe('Product', () => {
  const product = {
    featuredAsset: {
      preview: 'https://example.com/product-image.jpg',
    },
    name: 'Test Product',
    slug: 'test-product',
  };
  const setProductMock = jest.fn();

  beforeEach(() => {
    render(<Product element={product} settingProduct={setProductMock} />);
  });

  it('renders the product image', () => {
    const productImage = screen.getByAltText('');
    expect(productImage).toBeInTheDocument();
    expect((productImage as HTMLImageElement).src).toBe(product.featuredAsset.preview);
  });

  it('renders the product name and price', () => {
    const productName = screen.getByText(product.name);
    const productPrice = screen.getByText('$59');

    expect(productName).toBeInTheDocument();
    expect(productPrice).toBeInTheDocument();
  });

  it('calls the setProduct function when the add to cart button is clicked', () => {
    const addToCartButton = screen.getByTestId("add-to-cart");
    fireEvent.click(addToCartButton);

    expect(setProductMock).toHaveBeenCalledTimes(1);
    expect(setProductMock).toHaveBeenCalledWith(product);
  });
});
