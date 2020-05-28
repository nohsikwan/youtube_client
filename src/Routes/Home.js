import React, { useContext, useEffect, useState } from "react";
import HeaderComponent from "../Components/HeaderComponent";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import youtube, { baseParams } from "./youtube";
import YoutubePlayer from "../Components/YoutubePlayer";
const Wrap = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-wrap: wrap;
`;
const Home = ({ history }) => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [searchItem, setSearchItem] = useState("node");

  const youtubeVideo = async () => {
    const {
      data: { items },
    } = await youtube.get("/search", {
      params: {
        ...baseParams,
        q: searchItem,
      },
    });
    setYoutubeVideos(items);
  };

  useEffect(() => {
    youtubeVideo();
  }, [searchItem]);
  return (
    <>
      <HeaderComponent setSearchItem={setSearchItem} />
      <Wrap>
        {youtubeVideos.length > 1 &&
          youtubeVideos.map((video, key) => (
            <YoutubePlayer key={key} video={video} />
          ))}
      </Wrap>
    </>
  );
};

export default withRouter(Home);
