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

const VideoPlayer = ({ video }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <iframe
            controls={true}
            className="embed-responsive-item"
            src={` https://www.youtube.com/embed/${video.id.videoId}`}
            allowFullScreen
          ></iframe>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              title:{`${video.snippet.title}`.slice(0, 10)}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              description:{`${video.snippet.description}`.slice(0, 10)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              publishedAt:{`${video.snippet.publishedAt}`.slice(0, 10)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default VideoPlayer;
