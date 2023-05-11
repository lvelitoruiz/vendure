import React from 'react'
import { Pagination, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Slide from './Slide';

export default function Slider(props: any) {

    const settingProduct = (item: any) => {
        props.settingProduct(item);
    }
    return (
        <Swiper
            modules={[Pagination, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                "delay": 4000,
                "disableOnInteraction": false
            }}
            className='w-full h-[727px] relative flex items-center'
        >
            {
                (props.items.length) &&
                props.items.map((item: any, index: number) => {
                    return (
                        <SwiperSlide key={index}>
                            <Slide product={item} seetingNewProduct={() => settingProduct(item)}></Slide>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}
