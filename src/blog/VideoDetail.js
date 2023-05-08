import React from "react";
import Quiz from "./components/Quiz";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading....</div>;
  }

  //const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  console.log("VIDEO URL", video)

  return (
    <div className="h-100">
      <div className="cta-video-image h-100">
        {
          video.lectureType === 'video' &&
          <div className="ui embed">
            <iframe src={video.videoLink} title="videoplayer" />
          </div>
        }
        {
          video.lectureType === 'text' &&
          <div className="card w-100 h-100 bg-white overflow-auto">
            <p style={{ whiteSpace: 'pre-wrap' }} className="p-3 pt-5 h5">
              {video.lectureText}
            </p>
          </div>
        }
        {
          video.lectureType === 'quiz' &&
          <Quiz className="ui embed" props={video.quiz} />
        }
      </div>
    </div>
  );
};

export default VideoDetail;
