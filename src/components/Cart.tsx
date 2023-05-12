import React from 'react';

export default function Cart(props: any) {

    return (
        <section className="px-[15px] mx-auto absolute z-10 bg-white w-full mt-[72px]">
            <div className="flex flex-col lg:flex-row items-start py-10 lg:py-20 gap-10 lg:gap-20">
                <div className="w-full">
                    <div className="flex items-center border-b border-[#EBEBEB] px-[15px] py-4">
                        <div className="w-6/12">
                            <p className="text-[#969DA8] font-medium">PRODUCT</p>
                        </div>
                        <div className="w-3/12">
                            <p className="text-[#969DA8] font-medium">QUANTITY</p>
                        </div>
                        <div className="w-3/12">
                            <p className="text-end text-[#969DA8] font-medium">PRICE</p>
                        </div>
                    </div>
                    <div className='overflow-auto max-h-72'>
                        {
                            (props.items !== null && props.items !== undefined) ?
                                props.items.map((item: any, index: number) => {
                                    return (
                                        <div data-testid="cart-item" className="flex items-center border-b border-[#EBEBEB] px-[15px] py-8" key={index}>
                                            <div className="w-6/12">
                                                <div className="flex items-center gap-4">
                                                    <img className="w-[45px] h-[45px] object-cover rounded-md hidden md:block" src={item.featuredAsset.preview} alt="" />
                                                    <p>{item.productVariant.name}</p>
                                                </div>
                                            </div>
                                            <div className="w-3/12">
                                                <div className="flex">
                                                    <div className="border border-[#EBEBEB] rounded-md px-4">
                                                        <span className="w-[30px] h-[30px] text-[#1E242C]">{item.quantity}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-3/12">
                                                <p className="text-[#1E242C] font-medium text-end">${item.linePrice}</p>
                                            </div>
                                        </div>
                                    )
                                }) : <div>No hay elementos</div>
                        }
                    </div>
                </div>
                <div className="bg-white shadow-[0_10px_20px_0_rgba(203,203,203,0.25)] p-[20px] w-full lg:min-w-[400px] lg:w-[400px] rounded-md">
                    <h3 className="text-[#1E242C] mb-4 text-[20px] font-medium">Your Order</h3>
                    <div className="border-b border-[#EBEBEB] pb-3">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[#969DA8] font-medium">Subtotal</p>
                            <p className="text-[#1E242C] font-medium">${props.total}</p>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[#969DA8] font-medium">Discount</p>
                            <p className="text-[#969DA8] font-medium">-$0</p>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[#969DA8] font-medium">Shipment cost</p>
                            <p className="text-[#969DA8] font-medium">$0</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4 mb-10">
                        <p className="text-[#1E242C] font-medium">Grand total</p>
                        <p className="text-[#1E242C] font-medium">${props.total}</p>
                    </div>
                    <button className="bg-[#1E242C] w-full h-[50px] flex items-center justify-center text-white rounded-md" data-testid="cart-button-child" >Continue to payment</button>
                </div>
            </div>
        </section>
    )
}
