import React, { useState, useEffect } from "react";

import axios from "axios";
import UserHearderComponent from "../Components/UserHearderComponent";
import UsersVideoItem from "../Components/UsersVideoItem";
import styled from "styled-components";

const Wrap = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-wrap: wrap;
`;

const UserVideoBox = () => {
  const [videoItem, setVideoItem] = useState([]);
  const getVideo = async () => {
    const token = localStorage.getItem("token");
    const headerOption = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const video = await axios.get(
        `http://localhost:4000/video/usersVideo`,
        headerOption
      );
      setVideoItem(video.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <UserHearderComponent setVideoItem={setVideoItem} />
      <h1 style={{ marginLeft: "5%" }}> User Video List</h1>
      <Wrap>
        {videoItem.length >= 1 &&
          videoItem.map((video, key) => (
            <UsersVideoItem key={key} video={video} />
          ))}
      </Wrap>
    </>
  );
};

export default UserVideoBox;
