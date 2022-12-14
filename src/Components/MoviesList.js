import Row from "react-bootstrap/Row";
import React from "react";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const Routes = () => {
  const navigate = useNavigate();
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const endpoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

    axios
      .get(endpoint)
      .then((promise) => {
        const apiData = promise.data.results;
        setMovieList(apiData);
      })
      .catch((error) =>
        swAlert({
          title: "Oops!",
          text: `There was an error, please
           try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );
  }, [setMovieList]);

  return (
    <Row>
      {movieList.map((oneMovie, index) => {
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
                  image={`https://image.tmdb.org/t/p/original${oneMovie.poster_path}`}
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
  );
};

export default Routes;
