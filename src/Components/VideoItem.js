import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import EditVideoBoard from "./EditVideoBoard";
const useStyles = makeStyles({
  root: {
    maxWidth: "24%",
    marginLeft: "1%",
    marginTop: "1%",
  },
});

const VideoItem = ({ video, myVideoItem, setMyVideoItem }) => {
  const [open, setOpen] = useState(false);
  const [stateTitle, setStateTitle] = useState(video.title);
  const [stateDescription, setStateDescription] = useState(video.description);

  const classes = useStyles();
  ///////////func////////////
  const handleEdit = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const videoId = video._id;
    try {
      await axios.post(
        `http://localhost:4000/video/delete`,
        {
          videoId: videoId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const filterVideo = myVideoItem.filter((video) => {
        return video._id !== videoId;
      });
      setMyVideoItem(filterVideo);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <video
            src={video.fileUrl}
            style={{ maxHeight: "25%", maxWidth: "100%" }}
            controls={true}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              title:{stateTitle}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              description:{stateDescription}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              createdAt:{`${video.createdAt}`.slice(0, 10)}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
      <EditVideoBoard
        open={open}
        setOpen={setOpen}
        videoId={video._id}
        currTitle={video.title}
        currDescription={video.description}
        setStateDescription={setStateDescription}
        setStateTitle={setStateTitle}
      />
    </>
  );
};

export default VideoItem;

//-----home------
//home 에대한 youtube API 발급 받기;;;
//home 에 영상 뿌려주기;;;

//-----user-------
//userComponeents 생성해주기

//-----video Like unLike
