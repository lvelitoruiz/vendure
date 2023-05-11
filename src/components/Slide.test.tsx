import React from 'react';
import { shallow } from 'enzyme';
import Slide from './Slide';

describe('Slide', () => {
  const product = {
    name: 'Product Name',
    description: 'Product Description',
    featuredAsset: {
      preview: 'https://example.com/image.jpg',
    },
  };

  it('renders an image if the product has a featuredAsset', () => {
    const wrapper = shallow(<Slide product={product} />);
    expect(wrapper.find('img').prop('src')).toEqual(product.featuredAsset.preview);
  });

  it('renders a default image if the product does not have a featuredAsset', () => {
    const productWithoutAsset = { ...product, featuredAsset: null };
    const wrapper = shallow(<Slide product={productWithoutAsset} />);
    const defaultImageSrc = 'https://demo.vendure.io/assets/preview/b8/kelly-sikkema-685291-unsplash__preview.jpg';
    expect(wrapper.find('img').prop('src')).toEqual(defaultImageSrc);
  });

  it('calls the seetingNewProduct prop when the "Add To Card" button is clicked', () => {
    const seetingNewProduct = jest.fn();
    const wrapper = shallow(<Slide product={product} seetingNewProduct={seetingNewProduct} />);
    wrapper.find('button').simulate('click');
    expect(seetingNewProduct).toHaveBeenCalledWith(product);
  });
});
