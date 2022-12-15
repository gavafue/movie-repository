import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import React from "react";
import {
  Typography,
  Rating,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import CardJoy from "@mui/joy/Card";
import CardCoverJoy from "@mui/joy/CardCover";
import CardContentJoy from "@mui/joy/CardContent";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [popularFilms, setPopularFilms] = useState([]);
  const [trending, setTrending] = useState([]);
  const popularFilmsURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1";
  const trendingURL =
    "https://api.themoviedb.org/3/trending/all/day?api_key=51b3e2f36ad739cff7692a885496b3f8";

  useEffect(() => {
    axios
      .get(popularFilmsURL)
      .then((response) => {
        const apiData = response.data.results
          .sort((x, y) => (x.popularity = y.popularity))
          .slice(0, 6);
        setPopularFilms(apiData);
      })
      .catch((error) => console.log(error));

    axios
      .get(trendingURL)
      .then((response) => {
        const apiData = response.data.results;
        setTrending(apiData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container style={{ marginTop: "10px" }}>
      <Row>
        <Col xs={12} md={8}>
          <h5 className="text-center">Top 6 movies</h5>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="mx-auto"
            interval={2000}
          >
            {popularFilms?.map((film, index) => {
              return (
                <Carousel.Item key={index}>
                  <CardJoy
                    sx={{ minHeight: "80vh", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/movies/details?movieID=${film.id}`)
                    }
                  >
                    <CardCoverJoy>
                      <img
                        src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                        srcSet={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                        loading="lazy"
                        alt={film.title}
                      />
                    </CardCoverJoy>
                    <CardCoverJoy
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                      }}
                    />
                    <CardContentJoy sx={{ justifyContent: "flex-end" }}>
                      <Typography
                        level="h2"
                        fontSize="lg"
                        style={{ color: "white", textAlign: "center" }}
                        mb={1}
                      >
                        {film.title}
                      </Typography>
                    </CardContentJoy>
                  </CardJoy>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col xs={12} md={4}>
          <h5 className="text-center">Trenging list</h5>
          <Container style={{ height: "80vh", overflow: "auto" }}>
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              {trending.map((multimedia, index) => {
                return (
                  <div
                    key={index}
                    style={{ alignItems: "flex-start" }}
                    onClick={() => {
                      if (multimedia.media_type === "movie") {
                        navigate(`/movies/details?movieID=${multimedia.id}`);
                      }
                    }}
                  >
                    <Row>
                      <Col xs={3}>
                        <ListItemAvatar className="d-flex justify-content-center">
                          <Avatar
                            style={{ heigth: "100vh" }}
                            variant="square"
                            alt={
                              multimedia.title
                                ? multimedia.title
                                : multimedia.name
                            }
                            src={`https://image.tmdb.org/t/p/original${multimedia.poster_path}`}
                          />
                        </ListItemAvatar>
                      </Col>
                      <Col>
                        <Row>
                          <Col style={{ textAlign: "center" }}>
                            {multimedia.title
                              ? multimedia.title
                              : multimedia.name}
                          </Col>
                        </Row>
                        <Row>
                          <Typography
                            sx={{ textAlign: "center", fontSize: "10px" }}
                            color="text.primary"
                          >
                            {multimedia.media_type.toUpperCase()}
                          </Typography>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={9} className="d-flex justify-content-center">
                        <Rating
                          name="Rating"
                          size="small"
                          value={multimedia.vote_average}
                          precision={0.5}
                          max={10}
                          readOnly
                        />
                      </Col>
                      <Col
                        style={{ fontSize: "12px", alignItems: "center" }}
                      >{`${JSON.stringify(multimedia.vote_average).slice(
                        0,
                        3
                      )}/10`}</Col>
                    </Row>
                    <Divider variant="inset" component="li" />
                  </div>
                );
              })}
            </List>
          </Container>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
        <Container>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                as;dsas;dlk
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
              </Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Container>
      </Row>
    </Container>
  );
};
export default Landing;
