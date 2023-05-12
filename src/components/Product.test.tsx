import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Product from './Product';

describe('Product', () => {
  const mockProduct = {
    featuredAsset: {
      preview: 'https://example.com/image.jpg',
    },
    variants: [{ price: '900', stockLevel: "IN_STOCK" }],
    name: 'Test Product',
    slug: 'test-product',
  };
  const mockSettingProduct = jest.fn();

  beforeEach(() => {
    mockSettingProduct.mockClear();
  });

  it('renders the product image', () => {
    const { getByAltText } = render(<Product element={mockProduct} settingProduct={mockSettingProduct} />);
    expect(getByAltText('Test Product')).toBeInTheDocument();
  });

  it('renders the product name and price', () => {
    const { getByText } = render(<Product element={mockProduct} settingProduct={mockSettingProduct} />);
    expect(getByText('Test Product')).toBeInTheDocument();
    expect(getByText('$900')).toBeInTheDocument();
  });

  it('calls the settingProduct function when the Add to Cart button is clicked', () => {
    const { getByTestId } = render(<Product element={mockProduct} settingProduct={mockSettingProduct} />);
    fireEvent.click(getByTestId('add-to-cart'));
    expect(mockSettingProduct).toHaveBeenCalledTimes(1);
    expect(mockSettingProduct).toHaveBeenCalledWith(mockProduct);
  });

  it('renders a placeholder image when the product does not have a featured asset', () => {
    const mockProductWithoutAsset = { ...mockProduct, featuredAsset: null };
    const { getByAltText } = render(<Product element={mockProductWithoutAsset} settingProduct={mockSettingProduct} />);
    expect(getByAltText('Test Product')).toBeInTheDocument();
  });
});
