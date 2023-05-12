import { useEffect, useState } from 'react';
import { TotalContext } from './Context';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { useQuery } from '@apollo/client';
import { activeOrderQuery } from './graphql/queries';

interface ActiveOrder {
  code: string;
  currencyCode: string;
  id: string;
  lines: {
    __typename: string;
    id: string;
    productVariant: any; 
    unitPriceWithTax: number;
    quantity: number;
  }[];
  state: string;
  total: number;
}

function App() {
  const [total, setTotal] = useState<number>(0);

  const { data: cartInformation } = useQuery<{ activeOrder: ActiveOrder }>(activeOrderQuery);

  useEffect( () => {
    if(cartInformation !== null && cartInformation !== undefined) {
      setTotal(cartInformation.activeOrder.total);
    } else {
      setTotal(0);
    }
  },[cartInformation]);

  return (
    <TotalContext.Provider value={{ total, setTotal }}>
      <div className='bg-[#F9F9F9]'>
        <Header></Header>
        <ProductList></ProductList>
      </div>
    </TotalContext.Provider>
  );
}

export default App;
