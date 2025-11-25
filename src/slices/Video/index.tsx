import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { isFilled } from "@prismicio/client";
import { AutoPlayVideoCarousel } from "@/app/components/AutoPlayVideoCarousel";
import { NonSquareAutopayVideo } from "@/app/components/NonSquareAutopayVideo";
import { NonSquareAutoplayVideoTwo } from "@/app/components/NonSquareAutoplayVideoTwo";
/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video: FC<VideoProps> = ({ slice }) => {
  const videoUrl = isFilled.linkToMedia(slice.primary.video) ? slice.primary.video.url : "";
  const posterImage = slice.primary.video_first_frame;

  // Check if this is the Square Autoplay Video variation (default)
  if (slice.variation === "default") {
    return (
      <AutoPlayVideoCarousel
        srcProps={videoUrl}
        posterProps={posterImage}
      />
    );
  }

  // For Non-Square Autoplay Video variation
  if (slice.variation === "nonSquareAutoplayVideo") {
    if (slice.primary.full_bleed === true) {
      return (
        <div className="w-full h-full">
          <NonSquareAutoplayVideoTwo
            srcProps={videoUrl}
            posterProps={posterImage}
          />
        </div>
      );
    }
    return (
      <div className="w-[80vw] h-auto">
        <NonSquareAutopayVideo
          srcProps={videoUrl}
          posterProps={posterImage}
        />
      </div>
    );
  }
};

export default Video;
