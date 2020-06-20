import React, { useState, useEffect } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import StudioHeaderComponent from "../Components/StudioHeader";
import NewBoard from "../Components/NewBoard";
import { CreateVideo } from "./Icon";
import styled from "styled-components";

const VideoNoficationContainer = styled.div`
  position: absolute;
  right: 5%;
  top: 1%;
`;

const DropUpload = ({ setNewCreateVideoItem, setLoading, setMyVideoItem }) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [newBoard, setNewBoard] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (files) => {
    setFiles(files[0]);
    setNewBoard(true);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <>
      {/* header video Icon*/}
      <StudioHeaderComponent setMyVideoItem={setMyVideoItem} />
      <VideoNoficationContainer>
        <Button onClick={handleOpen}>{<CreateVideo />}</Button>
      </VideoNoficationContainer>
      {/* header */}

      {!newBoard ? (
        <DropzoneDialog
          open={open}
          onSave={handleSave}
          acceptedFiles={["video/*", "image/*"]}
          showPreviews={true}
          maxFileSize={500000000}
          onClose={handleClose}
        />
      ) : (
        <NewBoard
          setNewBoard={setNewBoard}
          files={files}
          setNewCreateVideoItem={setNewCreateVideoItem}
          setLoading={setLoading}
        />
      )}
    </>
  );
};

export default DropUpload;
