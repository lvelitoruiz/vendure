import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { getProductsQuery, activeOrderQuery } from '../graphql/queries';
import { addItemToOrderMutation } from '../graphql/mutations';
import Product from './Product';
import Slider from './Slider';

interface ProductListProps { }

interface ActiveOrder {
  id: number;
}

interface GetProductsData {
  products: {
    items: {
      id: number;
      name: string;
      slug: string;
      featuredAsset: {
        preview: string;
      } | null;
    }[];
  };
}

export function ProductList(props: ProductListProps) {
  const { loading, data } = useQuery<GetProductsData>(getProductsQuery);
  const { data: cartInformation } = useQuery<{ activeOrder: ActiveOrder }>(activeOrderQuery);
  const [product, setProduct] = useState<any>(null);
  const [bannerList, setBannerList] = useState<any>(null);

  const [updateCart, { error }] = useMutation(addItemToOrderMutation, {
    update: (cache, mutationResult) => {
      const data = cache.readQuery<{ activeOrder: ActiveOrder }>({
        query: activeOrderQuery,
      });

      if (data && data.activeOrder) {
        const { activeOrder } = data;
        cache.writeQuery({
          query: activeOrderQuery,
          data: {
            activeOrder: mutationResult.data.addItemToOrder,
          },
        });
      }
    },
  });

  useEffect(() => {
    if (data !== null && data !== undefined) {
      setBannerList(bannerListCreate(data));
    }
  }, [data]);

  useEffect(() => {
    if (!product) return;

    // call mutation
    updateCart({
      variables: {
        productVariantId: Number(product?.id),
        quantity: 1,
      },
    });
  }, [product]);

  const settingProduct = (element: any) => {
    console.log('element to assign',element);
    setProduct(element);
  };

  const bannerListCreate = (arr: GetProductsData) => {
    const shuffled = [...arr.products.items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }

  return (
    <>
      <section className="h-[727px] relative flex items-center">
        {
          (bannerList !== null && bannerList !== undefined) ? <Slider items={bannerList} settingProduct={settingProduct}></Slider> : <div className='w-full h-[727px] relative flex justify-center items-center'>
            <div className='w-16 h-16'>
              <svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
                <circle fill="none" stroke="#3b3b3b" stroke-width="4" cx="50" cy="50" r="44" style={{ "opacity": "0.5" }} />
                <circle fill="#3b3b3b" stroke="#6b6b6b" stroke-width="3" cx="8" cy="54" r="6" >
                  <animateTransform
                    attributeName="transform"
                    dur="2s"
                    type="rotate"
                    from="0 50 48"
                    to="360 50 52"
                    repeatCount="indefinite" />

                </circle>
              </svg>
              <p className='mt-5'>Loading...</p>
            </div>
          </div>
        }
      </section>
      <section className="container px-[15px] mx-auto py-20">
        <div className="flex justify-between items-center pb-10">
          <h3 className="text-[#1E242C] text-[26px] uppercase font-extrabold border-b border-gray-900">Featured Products</h3>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {!loading ?
            data?.products?.items?.map((element: any) => {
              return <Product key={element.id} element={element} settingProduct={settingProduct} />;
            }) :
            <div className='w-full h-[727px] relative flex justify-center items-center'>
              <div className='w-16 h-16'>
                <svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xmlSpace="preserve">
                  <circle fill="none" stroke="#3b3b3b" stroke-width="4" cx="50" cy="50" r="44" style={{ "opacity": "0.5" }} />
                  <circle fill="#3b3b3b" stroke="#6b6b6b" stroke-width="3" cx="8" cy="54" r="6" >
                    <animateTransform
                      attributeName="transform"
                      dur="2s"
                      type="rotate"
                      from="0 50 48"
                      to="360 50 52"
                      repeatCount="indefinite" />

                  </circle>
                </svg>
                <p className='mt-5'>Loading...</p>
              </div>
            </div>
          }

          {error && <div>{error?.message}</div>}
        </div>
      </section>
    </>
  );
}
