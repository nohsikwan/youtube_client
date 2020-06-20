import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: "24%",
    marginLeft: "1%",
    marginTop: "1%",
  },
});

const UsersVideoItem = ({ video }) => {
  const classes = useStyles();

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
              {video.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p">
              description:{video.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              createdAt:{`${video.createdAt}`.slice(0, 10)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default UsersVideoItem;
