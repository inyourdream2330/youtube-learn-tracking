import React from "react";
import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
const VideoEmbbed = () => {
  const {
    postState: {
      post: { url },
    },
  } = useContext(PostContext);

  const videoId = () => {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    console.log(match)
    return match && match[2].length === 11 ?match[2] : null;
  };

  return (
    <iframe width="100%"
     height="100%"
      src={"https://www.youtube.com/embed/"+videoId()}
      title="YouTube video player"
       frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen></iframe>
    
  );
};

export default VideoEmbbed;
