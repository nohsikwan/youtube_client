import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import useInput from "../Hooks/useInput";
import axios from "axios";

const EditVideoBoard = ({
  open,
  setOpen,
  videoId,
  currTitle,
  currDescription,
  setStateDescription,
  setStateTitle,
}) => {
  const titleInput = useInput("");
  const descriptionInput = useInput("");
  const handleSubmitClick = async (e) => {
    try {
      const token = localStorage.getItem("token");
      if (titleInput.value !== "" && descriptionInput.value === "") {
        //title변경
        await axios.post(
          `http://localhost:4000/video/edit`,
          {
            videoId: videoId,
            title: titleInput.value,
            description: currDescription,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStateTitle(titleInput.value);
      } else if (descriptionInput.value !== "" && titleInput.value === "") {
        //   Description만변경
        await axios.post(
          `http://localhost:4000/video/edit`,
          {
            videoId: videoId,
            title: currTitle,
            description: descriptionInput.value,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStateDescription(descriptionInput.value);
      } else {
        //   둘다 변경
        await axios.post(
          `http://localhost:4000/video/edit`,
          {
            videoId: videoId,
            title: titleInput.value,
            description: descriptionInput.value,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStateTitle(titleInput.value);
        setStateDescription(descriptionInput.value);
      }
    } catch (error) {
      console.log(error);
    } finally {
      titleInput.setValue("");
      descriptionInput.setValue("");
      setOpen(false);
    }
  };

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClick}>
        <DialogTitle>Title && Description </DialogTitle>

        <DialogContent>
          <TextField
            label="Edit title"
            type="text"
            name="title"
            onChange={titleInput.onChange}
            value={titleInput.value}
          />
          <br />
          <CssBaseline />
          <TextField
            label="Edit  Description"
            type="text"
            name="Description"
            onChange={descriptionInput.onChange}
            value={descriptionInput.value}
          />
          <br />
          <CssBaseline />
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitClick}
          >
            Edit
          </Button>

          <Button variant="outlined" color="primary" onClick={handleClick}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditVideoBoard;
