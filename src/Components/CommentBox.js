import {
  Paper,
  Typography,
  TextField,
  Button,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const comments = [
  { name: "John Doe", comment: "This is a great website!" },
  { name: "Jane Doe", comment: "I really like the design of this site." },
  {
    name: "Bob Smith",
    comment: "The content on this site is very informative.",
  },
  {
    name: "Emily Johnson",
    comment: "I will definitely be using this site again in the future.",
  },
  { name: "William Brown", comment: "I highly recommend this site to others." },
  { name: "Ava Davis", comment: "I had a great experience using this site." },
];

const CommentBox = () => {
  const moviesCollection = collection(db, "movies");

  const [comment, setComment] = useState("");
  const handleSubmit = async () => {
    console.log(comment);
    // Add a new document in collection "cities"
    addDoc(moviesCollection, {
      name: "Gabriel",
      content: "Trying",
    })
      .then(console.log("done"))
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Paper>
        <Typography variant="h5">Leave a comment:</Typography>
        <TextField
          label="Your comment"
          multiline
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Paper>
      <Paper>
        <Typography variant="h5">Comments:</Typography>
        <List>
          {comments.map((comment, index) => (
            <ListItem key={index}>
              {comment.name}
              <ListItemText primary={comment.comment} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default CommentBox;
