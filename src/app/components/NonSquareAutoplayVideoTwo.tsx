"use client";

import { useEffect, useState, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { useOnScreen } from "./UseOnScreen";

interface NonSquareAutoplayVideoTwoProps {
  srcProps: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posterProps: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // changedSlide?: any;
}

// export const AutoPlayVideo = ({ srcProps, posterProps, changedSlide }: AutoPlayVideoProps) => {
export const NonSquareAutoplayVideoTwo = ({ srcProps, posterProps }: NonSquareAutoplayVideoTwoProps) => {
  // https://stackoverflow.com/questions/58341787/intersectionobserver-with-react-hooks
  // https://frontend-digest.com/responsive-and-progressive-video-loading-in-react-e8753315af51
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayVideoRef = useRef<HTMLVideoElement>(null);
  const isOnScreen = useOnScreen(containerRef);
  const [videoSrcState, setVideoSrcState] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  console.log("hello world");
  console.log(isOnScreen);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  // Set video source when on screen
  useEffect(() => {
    if (isOnScreen == true && srcProps) {
      // console.log("Setting video source:", srcProps);
      setVideoSrcState(srcProps);
    } else if (isOnScreen === false) {
      if (autoplayVideoRef.current) {
        autoplayVideoRef.current.pause();
        autoplayVideoRef.current.currentTime = 0;
      }
      setIsVideoLoaded(false);
      setVideoSrcState("");
    }
  }, [isOnScreen, srcProps]);


  // Load and play video when source is set
  useEffect(() => {
    if (videoSrcState && autoplayVideoRef.current) {
      // console.log("Loading and playing video with source:", videoSrcState);
      const video = autoplayVideoRef.current;

      // Set the source directly on the video element for immediate loading
      const sourceElement = video.querySelector('source');
      if (sourceElement) {
        sourceElement.src = videoSrcState;
      }
      console.log("LOAD")
      video.load();

      // Use a small timeout to ensure the source is set before playing
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing successfully");
          })
          .catch((error) => {
            // AbortError is expected when pause() interrupts play() - this is normal behavior
            if (error.name !== 'AbortError') {
              console.error("Error playing video:", error);
            }
          });
      }
    }
  }, [videoSrcState]);

  // Extract image URL from posterProps (handles Prismic image field or direct URL)
  const getPosterImageUrl = () => {
    if (typeof posterProps === "string") {
      return posterProps;
    }
    if (posterProps?.url) {
      return posterProps.url;
    }
    if (posterProps?.image?.url) {
      return posterProps.image.url;
    }
    // Fallback for Gatsby image structure
    if (posterProps?.gatsbyImageData?.images?.fallback?.src) {
      return posterProps.gatsbyImageData.images.fallback.src;
    }
    return "";
  };

  const posterImageUrl = getPosterImageUrl();

  // Debug logging
  useEffect(() => {
    // console.log("Video state:", { isOnScreen, videoSrcState, isVideoLoaded, srcProps });
  }, [isOnScreen, videoSrcState, isVideoLoaded, srcProps]);


  return (
    <>
      <div ref={containerRef} className="relative w-full h-[110vh] min-h-[110vh]">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            opacity: isVideoLoaded ? 0 : 1,
            pointerEvents: isVideoLoaded ? "none" : "auto",
            // transition: "opacity 0.3s ease-in-out",
            zIndex: isVideoLoaded ? 0 : 1,
          }}
        >
          <div className="absolute z-[10000] w-full h-full hidden max-[665px]:grid items-center justify-center">
            <p className="text-black px-2.5 py-2.5 bg-white rounded-md shadow-[0px_0px_13px_0px_rgba(0,0,0,0.13)] -mt-px animate-breathe">
              Video Loading
            </p>
          </div>
          <div className="w-full h-full relative">
            {posterProps && (
              <PrismicNextImage
                field={posterProps}
                className="object-cover w-full h-full"
                imgixParams={{ fit: "crop" }}
                alt={posterImageUrl}
              />
            )}
          </div>
        </div>

        <video
          className="absolute inset-0 w-full h-full object-cover"
          playsInline
          autoPlay
          muted
          loop
          ref={autoplayVideoRef}
          // onCanPlayThrough={onLoadedData}
          onLoadedData={onLoadedData}
          style={{
            opacity: isVideoLoaded ? 1 : 0,
            pointerEvents: isVideoLoaded ? "auto" : "none",
            // transition: "opacity 0.3s ease-in-out",
            zIndex: isVideoLoaded ? 1 : 0,
          }}
        >
          {/* <source type="video/mp4" src={videoSrcState} /> */}
          {videoSrcState && <source type="video/mp4" src={videoSrcState} />}
        </video>
      </div>
    </>
  );
};
