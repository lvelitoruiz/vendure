import React from 'react'
import useFormat from '../hooks/useFormat';

export default function Slide(props: any) {
  console.log(props.product);
  return (
    <div className='w-full h-[727px] relative flex items-center'>
      <div className="relative h-[727px] w-full before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:content-[''] before:bg-[#00000075]">
        {/* <img className="object-cover h-[727px] w-full" src={props.product.featuredAsset.source} alt="" /> */}
        {props.product.featuredAsset !== null ? (
          <img
            className="object-cover h-full w-full rounded-md hover:grayscale cursor-pointer hover:scale-125 duration-300 hover:duration-300"
            src={props.product.featuredAsset.preview}
            alt=""
          />
        ) :
          (
            <img
              className="object-cover h-full w-full rounded-md"
              src="https://demo.vendure.io/assets/preview/b8/kelly-sikkema-685291-unsplash__preview.jpg"
              alt=""
            />

          )
        }
      </div>

      <div className="container px-[15px] mx-auto absolute left-0 right-0">
        <div className="md:w-7/12 lg:w-4/12">
          <h2 className="text-white leading-none font-semibold text-[40px]">{props.product.name}</h2>
          <p className="text-white leading-[26px] mt-4">{props.product.description}</p>
          <p className="text-white leading-[42px] text-3xl mt-4">${useFormat(props.product.variants[0].price)}</p>

          {
            (props.product?.variants[0]?.stockLevel === "IN_STOCK") ?
              <button className="bg-white h-[50px] flex items-center justify-between w-6/12 px-[16px] rounded-md mt-[27px] text-[#1E242C] duration-300 hover:duration-300 hover:bg-red-500 hover:text-white" onClick={() => props.seetingNewProduct(props.product)}><span>Add To Card</span><i className="iconoir-cart text-[20px]"></i></button> :
              <button className="bg-red-500 h-[50px] flex items-center justify-between w-6/12 px-[16px] rounded-md mt-[27px] duration-300 hover:duration-300 hover:bg-blue-500 text-white"><span>Out Of Stock</span><i className="iconoir-lock text-[20px]"></i></button>
          }
        </div>
      </div>
    </div>
  )
}
