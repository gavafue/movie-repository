import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/Favorites/favouritesSlice";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
  const favorites = useSelector((state) => state.favorites.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div style={{ minWidth: "450px" }}>
      <h5 className="text-center">Favorites</h5>
      <List>
        {favorites.length > 0 ? (
          favorites?.map((movie, idx) => (
            <ListItem
              key={idx}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(removeFavorite(movie))}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              {console.log(movie)}
              <ListItemAvatar>
                <Avatar
                  sx={{ width: 60, height: 60, margin: "5px" }}
                  src={movie.payload.poster_path}
                  variant="rounded"
                ></Avatar>
              </ListItemAvatar>
              <ListItemText
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (movie.payload.type === "movie") {
                    navigate(`/movies/details?movieID=${movie?.payload.id}`);
                  }
                }}
                primary={
                  movie.payload.title ? movie.payload.title : movie.payload.name
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItem>First add an item to favourites</ListItem>
        )}
      </List>
    </div>
  );
};
export default Favourites;
