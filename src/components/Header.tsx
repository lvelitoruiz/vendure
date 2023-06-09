import { useState } from "react";
import Cart from "./Cart";
import { useQuery } from "@apollo/client";
import { activeOrderQuery } from "../graphql/queries";
import useStateWithStorage from "../hooks/useStateWithStorage";
import { useTotal } from "../Context";
import useFormat from "../hooks/useFormat";

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

export function Header() {

  const [showCart, setShowCart] = useStateWithStorage('showCart', false);

  const { total } = useTotal();

  const changeCart = () => {
    setShowCart(!showCart)
  }

  const { data: cartInformation } = useQuery<{ activeOrder: ActiveOrder }>(activeOrderQuery);

  return (
    <>
      <div className={`w-full pt-3 flex items-center justify-between px-[60px] ${showCart ? "bg-white" : ""} mx-auto absolute left-0 right-0 top-0 z-10`}>
        <h1 className={`${!showCart ? "text-white" : "text-black"} text-[40px] font-semibold top-0`}>santex</h1>
        <button className="bg-white flex items-center justify-center w-auto px-4 h-[50px] rounded-md duration-300 hover:duration-300 hover:bg-red-500" data-testid="cart-button" onClick={() => changeCart()}><span className="mr-4">${useFormat(total)}</span><span className="opacity-30">|</span> <i className={`${showCart ? "iconoir-cancel" : "iconoir-cart"} ml-4 text-[#1E242C] text-[20px]`}></i></button>
      </div>
      {(showCart) && <Cart total={cartInformation?.activeOrder?.total} items={cartInformation?.activeOrder?.lines}></Cart>}
    </>
  );
}
