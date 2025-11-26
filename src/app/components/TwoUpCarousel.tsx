"use client";

import React, {
  useRef,
  useState,
  Children,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";

interface ProjectData {
  title?: string;
  location?: string;
  date?: string;
  client?: string;
  sector?: string;
  uid?: string;
  homepage_sentence?: string;
  sentence?: string;
}

interface TwoUpCarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: any;
  project?: ProjectData;
}

export default function TwoUpCarousel({ children, project }: TwoUpCarouselProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Convert children to array for consistent handling
  const childrenArray = Children.toArray(children);
  const totalSlides = childrenArray.length;

  function nextFunc() {
    swiperRef.current.swiper.slideNext();
  }
  function prevFunc() {
    swiperRef.current.swiper.slidePrev();
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric" });
    } catch {
      return dateString;
    }
  };

  // Calculate which slides are currently visible (2 slides per view)
  const firstVisibleSlide = activeIndex + 1;
  const secondVisibleSlide = activeIndex + 2;
  const displayFirst = firstVisibleSlide > totalSlides ? firstVisibleSlide - totalSlides : firstVisibleSlide;
  const displaySecond = secondVisibleSlide > totalSlides ? secondVisibleSlide - totalSlides : secondVisibleSlide;

  return (
    <>
      <div className="w-[calc(100vw-10px)] ml-[10px] grid grid-cols-16 mb-[5px]">
        <div className="col-span-8">
          <p className="text-base">{displayFirst} of {totalSlides}</p>
        </div>
        <div className="col-span-6">
          <p className="text-base">{displaySecond} of {totalSlides}</p>
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
          loop={true}
          className="mySwiper"
          modules={[Navigation]}
          ref={swiperRef}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {childrenArray.map((child, index) => (
            <SwiperSlide key={index}>
              <div className="w-[calc(100%-10px)]">{child}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-[calc(100vw-10px)] ml-[11px] grid grid-cols-16 mt-[5px]">
        <div className="col-span-4">
          <p className="text-base">{project?.title || "Project Title"}</p>
        </div>
        <div className="col-span-4">
          <p className="text-base">{project?.location || "Location"}</p>
          <p className="text-base">{project?.date ? formatDate(project.date) : "Date"}</p>
        </div>
        <div className="col-span-4">
          <p className="text-base text-[12px]">
            {/* {project?.homepage_sentence} */}
            {project?.sentence}
          </p>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-2">
          {project?.uid ? (
            <Link href={`/project/${project.uid}`}>
              <p className="text-base text-gray-400">More Info</p>
            </Link>
          ) : (
            <p className="text-base text-gray-400">More Info</p>
          )}
        </div>
      </div>
    </>
  );
}
