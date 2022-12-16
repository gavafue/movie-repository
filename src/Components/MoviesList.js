import Row from "react-bootstrap/Row";
import React from "react";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Pagination } from "@mui/material";
const MySwal = withReactContent(swAlert);

const MoviesList = () => {
  const navigate = useNavigate();
  const [genresList, setGenresList] = useState([]);
  const [moviesList, setMoviesList] = useState([]);
  const [genreID, setGenreID] = useState(28);
  const [page, setPage] = useState(1);
  const fecha = new Date();
  const dia = fecha.getDate();
  const mesActual = fecha.getMonth() + 1;
  const año = fecha.getFullYear();

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const genresAPI =
      "https://api.themoviedb.org/3/genre/movie/list?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US";
    const discoverApi = `
    https://api.themoviedb.org/3/discover/movie?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&sort_by=release_date.desc&include_adult=false&page=${page}&release_date.lte=${año}-${mesActual}-${dia}&with_genres=${genreID}`;

    axios
      // eslint-disable-next-line
      .get(genresAPI)
      .then((response) => {
        const apiData = response.data.genres;
        setGenresList(apiData);
      })
      .catch((error) => console.log(error.message));

    axios
      // eslint-disable-next-line
      .get(discoverApi)
      .then((response) => {
        const apiData = response.data;
        setMoviesList(apiData);
      })
      .catch((error) =>
        MySwal.fire({
          icon: "error",
          title: "Ooops!...",
          text: `There were an error: ${error}`,
        })
      );
    // eslint-disable-next-line
  }, [genreID, page]);

  return (
    <Row>
      <Col xs={4} md={3} lg={2}>
        <Divider style={{ marginTop: "10px" }} />
        <List>
          {genresList?.map((genre) => (
            <ListItem
              key={genre.id}
              onClick={() => {
                setGenreID(genre.id);
                setPage(1);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              disablePadding
            >
              <ListItemButton>
                <ListItemText primary={genre.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Col>
      <Col xs={8} md={9} lg={10}>
        <Row>
          {moviesList.results?.map((oneMovie, index) => {
            console.log(
              `https://image.tmdb.org/t/p/original${oneMovie.poster_path}`
            );
            return (
              <Col
                xs={6}
                md={4}
                lg={3}
                key={index}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Card style={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={
                        oneMovie.poster_path
                          ? `https://image.tmdb.org/t/p/original${oneMovie.poster_path}`
                          : `http://via.placeholder.com/700x1000.png`
                      }
                      alt={oneMovie.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {oneMovie.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {oneMovie.overview.substring(0, 80)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        navigate(`/movies/details?movieID=${oneMovie.id}`)
                      }
                    >
                      View details
                    </Button>
                  </CardActions>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="d-flex justify-content-center text-center">
          <Pagination
            style={{ padding: "15px" }}
            variant="outlined"
            count={moviesList.total_pages < 500 ? moviesList.total_pages : 500}
            page={page}
            onChange={handleChange}
          />
        </div>
      </Col>
    </Row>
  );
};

export default MoviesList;
