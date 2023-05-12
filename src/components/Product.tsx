import React from 'react';

interface ProductProps {
    element: {
        featuredAsset: {
            preview: string;
        } | null;
        variants: any[];
        name: string;
        slug: string;
    };
    settingProduct: (element: {
        featuredAsset: {
            preview: string;
        } | null;
        variants: any[];
        name: string;
        slug: string;
    }) => void;
}

export default function Product({ element, settingProduct }: ProductProps) {
    return (
        <div>
            <div className="md:h-[260px] lg:h-[360px] overflow-hidden rounded-md">
                {element.featuredAsset !== null ? (
                    <img
                        className="object-cover h-full w-full rounded-md hover:grayscale cursor-pointer hover:scale-125 duration-300 hover:duration-300"
                        src={element.featuredAsset.preview}
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
            <div className="flex items-center justify-between mt-3">
                <div>
                    <p className="text-[#1E242C] font-medium leading-none mb-2">
                        {element.name}
                    </p>
                    <div className="flex items-start">
                        <p className="text-[#1E242C] text-[26px] font-semibold leading-none">
                            {element?.variants[0]?.price}
                        </p>
                        <p className="leading-none text-[#9BA2AE] text-sm ml-4 line-through">
                            {element.slug}
                        </p>
                    </div>
                </div>
                <button
                    className="bg-[#1E242C] flex items-center justify-center w-[50px] h-[50px] rounded-md duration-300 hover:duration-300 hover:bg-red-500"
                    data-testid="add-to-cart" onClick={() => settingProduct(element)}
                >
                    <i className="iconoir-cart text-white text-[20px]"></i>
                </button>
            </div>
        </div>
    );
}