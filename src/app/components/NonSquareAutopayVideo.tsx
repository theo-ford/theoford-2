"use client";

import { useEffect, useState, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { useOnScreen } from "./UseOnScreen";

interface NonSquareAutopayVideoProps {
  srcProps: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posterProps: any;
  size?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // changedSlide?: any;
}

// export const AutoPlayVideo = ({ srcProps, posterProps, changedSlide }: AutoPlayVideoProps) => {
export const NonSquareAutopayVideo = ({ srcProps, posterProps, size }: NonSquareAutopayVideoProps) => {
  // https://stackoverflow.com/questions/58341787/intersectionobserver-with-react-hooks
  // https://frontend-digest.com/responsive-and-progressive-video-loading-in-react-e8753315af51
  const containerRef = useRef<HTMLDivElement>(null);
  const autoplayVideoRef = useRef<HTMLVideoElement>(null);
  const isOnScreen = useOnScreen(containerRef);
  const [videoSrcState, setVideoSrcState] = useState("");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const onLoadedData = () => {
    setIsVideoLoaded(true);
  };

  // Set video source when on screen
  useEffect(() => {
    if (isOnScreen == true && srcProps) {
      // console.log("Setting video source:", srcProps);
      setVideoSrcState(srcProps);
    } else if (isOnScreen === false) {
      setIsVideoLoaded(false);
      setVideoSrcState("");
      if (autoplayVideoRef.current) {
        autoplayVideoRef.current.pause();
      }
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

      video.load();

      // Use a small timeout to ensure the source is set before playing
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Video playing successfully");
          })
          .catch((error) => {
            console.error("Error playing video:", error);
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
      <div ref={containerRef} className="relative">
        <div className="relative w-[100vw] h-[110vh] flex items-center justify-center">
          <div className={`w-[${size}vw] h-auto relative`}>
            <div
              style={{
                opacity: isVideoLoaded ? 0 : 1,
                position: isVideoLoaded ? "absolute" : "relative",
                zIndex: isVideoLoaded ? 0 : 1,
              }}
            >
              <div className="absolute z-[10000] w-full h-full hidden max-[665px]:grid items-center justify-center">
                <p className="text-black px-2.5 py-2.5 bg-white rounded-md shadow-[0px_0px_13px_0px_rgba(0,0,0,0.13)] -mt-px animate-breathe">
                  Video Loading
                </p>
              </div>
              <div
                className={`w-[${size}vw] h-auto relative`}
                style={{
                  opacity: isVideoLoaded ? 0 : 1,
                  position: isVideoLoaded ? "absolute" : "relative",
                }}
              >
                {posterImageUrl && (
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
              className="w-full h-full object-cover"
              playsInline
              autoPlay
              muted
              loop
              ref={autoplayVideoRef}
              onLoadedData={onLoadedData}
              style={{
                opacity: isVideoLoaded ? 1 : 0,
                position: isVideoLoaded ? "relative" : "absolute",
              }}
            >
              {videoSrcState && <source type="video/mp4" src={videoSrcState} />}
            </video>
          </div>

        </div>
      </div>

    </>
  );
};
