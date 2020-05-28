import React, { useState, useEffect } from "react";
import DropUpload from "../Components/DropUpload";
import axios from "axios";
import VideoItem from "../Components/VideoItem";
import Loading from "../Components/Loading";
import styled from "styled-components";
const Wrap = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-wrap: wrap;
`;

const Upload = () => {
  const [loading, setLoading] = useState(false);
  const [myVideoItem, setMyVideoItem] = useState([]);
  const [newCreateVideoItem, setNewCreateVideoItem] = useState([]);
  const getVideo = async () => {
    const token = localStorage.getItem("token");
    const headerOption = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    try {
      const video = await axios.get(
        `http://localhost:4000/video/`,
        headerOption
      );
      setMyVideoItem(video.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideo();
  }, []);

  useEffect(() => {
    setLoading(false);
    setMyVideoItem([...myVideoItem, newCreateVideoItem]);
  }, [newCreateVideoItem]);

  return (
    <>
      <DropUpload
        setNewCreateVideoItem={setNewCreateVideoItem}
        setLoading={setLoading}
      />
      {loading && <Loading />}

      <h1 style={{ marginLeft: "5%" }}> My Upload Video List</h1>
      <Wrap>
        {myVideoItem.length >= 1 &&
          myVideoItem.map((video, key) => (
            <VideoItem
              key={key}
              video={video}
              myVideoItem={myVideoItem}
              setMyVideoItem={setMyVideoItem}
            />
          ))}
      </Wrap>
    </>
  );
};

export default Upload;
