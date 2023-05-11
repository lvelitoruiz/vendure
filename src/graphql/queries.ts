import { gql } from '@apollo/client';

export const getProductsQuery = gql`
  {
    products {
      items {
        id
        slug
        name
        featuredAsset {
          id
          source
          preview
        }
        description
        assets {
          source
        }
      }
    }
  }
`;

export const activeOrderQuery = gql`
  {
    activeOrder {
      ...ActiveOrder
    }
  }
  fragment ActiveOrder on Order {
    id
    code
    state
    total
    currencyCode
    lines {
      id
      productVariant {
        id
        name
        currencyCode
      }
      unitPriceWithTax
      quantity
      linePrice
      featuredAsset {
        id
        preview
      }
    }
  }
`;