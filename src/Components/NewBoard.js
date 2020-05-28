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

const NewBoard = ({
  setNewBoard,
  files,
  setNewCreateVideoItem,
  setLoading,
}) => {
  const boardText = useInput("");
  const boardDescription = useInput("");
  const form = new FormData();

  const handleSubmitClick = async (e) => {
    const token = localStorage.getItem("token");
    try {
      if (boardText.value !== "") {
        setNewBoard(false);
        setLoading(true);
        form.append("text", boardText.value);
        form.append("description", boardDescription.value);
        form.append("File", files);
        const newUploadData = await axios.post(
          `http://localhost:4000/video/upload`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setNewCreateVideoItem(newUploadData.data);
        boardText.setValue("");
        boardDescription.setValue("");
      } else {
        alert("text를 입력해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    setNewBoard(false);
  };

  return (
    <>
      <Dialog open={true} onClose={handleClick}>
        <DialogTitle>Title && Description </DialogTitle>

        <DialogContent>
          <TextField
            label="Add title"
            type="text"
            name="title"
            onChange={boardText.onChange}
            value={boardText.value}
          />
          <br />
          <CssBaseline />
          <TextField
            label="Add  Description"
            type="text"
            name="Description"
            onChange={boardDescription.onChange}
            value={boardDescription.value}
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
            추가
          </Button>

          <Button variant="outlined" color="primary" onClick={handleClick}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewBoard;
