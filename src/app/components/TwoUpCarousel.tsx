"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useMemo,
  ReactNode
} from "react";
import { Swiper, SwiperSlide, SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { components } from "@/slices";
import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

// export type TSwiper = Omit<SwiperProps, "children"> & {
//   children: SliceComponentProps<Content.ImageSlice>;
// };

// export default function OneUpCarousel({ children }): TSwiper {
export default function TwoUpCarousel({ children }: { children: any }) {
  const swiperRef = useRef<any>(null);

  function nextFunc() {
    swiperRef.current.swiper.slideNext();
  }
  function prevFunc() {
    swiperRef.current.swiper.slidePrev();
  }
  return (
    <>
      <div className="w-[calc(100vw-10px)] ml-[10px] grid grid-cols-16 mb-[5px]">
        <div className="col-span-8">
          <p className="text-base">1 of 4</p>
        </div>
        <div className="col-span-6">
          <p className="text-base">2 of 4</p>
        </div>
        <div className="col-span-2">
          <p className="text-base text-gray-400">Next</p>
        </div>
      </div>
      <div className="w-full h-[calc(50vw-15px)] absolute z-40">
        <div
          className="w-[50vw] h-[100%] absolute cursor-text left-0"
          onClick={prevFunc}
        ></div>
        <div
          className="w-[50vw] h-[100%] absolute cursor-move right-0"
          onClick={nextFunc}
        ></div>
      </div>

      <div className="w-[calc(100vw-10px)] ml-[12px]">
        <Swiper
          slidesPerView={2}
          slidesPerGroup={1}
          // autoplay={true}
          loop={true}
          className="mySwiper"
          modules={[Navigation]}
          ref={swiperRef}
        >
          {children.map((child: any, id: React.Key | null | undefined) => (
            <SwiperSlide key={id}>
              <div className="w-[calc(100%-10px)]">{child}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
