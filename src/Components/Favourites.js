import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Favourites = (props) => {
  return (
    <>
      <h2>Favorites</h2>
      <List>
        {[1, 2, 3].map((movie) => (
          <ListItem
            key={movie.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(e) => props.addOrRemoveFromFavorites(e, movie)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{ width: 60, height: 60, margin: "5px" }}
                src={movie.poster_path}
                variant="rounded"
              ></Avatar>
            </ListItemAvatar>
            <ListItemText primary={movie.title ? movie.title : movie.name} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
export default Favourites;
