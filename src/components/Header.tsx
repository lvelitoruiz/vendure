import { useEffect, useState } from "react";
import Cart from "./Cart";
import { useQuery } from "@apollo/client";
import { activeOrderQuery } from "../graphql/queries";

interface Cart {
  activeOrder: {
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
  };
  code: string;
  currencyCode: string;
  id: string;
  lines: {
    __typename: string;
    id: string;
  }[];
  state: string;
  total: number;
  __typename: string;
}

interface ActiveOrder {
  code: string;
  currencyCode: string;
  id: string;
  lines: {
    __typename: string;
    id: string;
    productVariant: any; // Update the type with the actual structure of `productVariant`
    unitPriceWithTax: number;
    quantity: number;
    // add any other properties here
  }[];
  state: string;
  total: number;
}


export function Header() {


  const [showCart, setShowCart] = useState(false);

  const changeCart = () => {
    setShowCart(!showCart)
  }

  const { data: cartInformation } = useQuery<{ activeOrder: ActiveOrder }>(activeOrderQuery);

  return (
    <>
      <div className={`w-full pt-3 flex items-center justify-between px-[60px] ${showCart ? "bg-white" : ""} mx-auto absolute left-0 right-0 top-0 z-10`}>
        <h1 className={`${!showCart ? "text-white" : "text-black"} text-[40px] font-semibold top-0`}>santex</h1>
        <button className="bg-white flex items-center justify-center w-[50px] h-[50px] rounded-md duration-300 hover:duration-300 hover:bg-red-500" data-testid="cart-button" onClick={() => changeCart()}><i className={`${showCart ? "iconoir-cancel" : "iconoir-cart"} text-[#1E242C] text-[20px]`}></i></button>
      </div>
      {(showCart) && <Cart total={cartInformation?.activeOrder.total} items={cartInformation?.activeOrder.lines}></Cart>}
    </>
  );
}
