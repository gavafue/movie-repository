import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
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
        const apiData = response.data.results;
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
  }, [setPopularFilms, setTrending]);

  return (
    <Container>
      <Row style={{ marginTop: "10px" }}>
        <Col xs={12} md={8} className="justify-content-center text-center">
          <Typography>
            <h5>Popular movies</h5>
          </Typography>
        </Col>
        <Col>
          <Typography>
            <h5 className="text-center">Trending list</h5>
          </Typography>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8}>
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
          <List
            sx={{
              width: "100%",
              bgcolor: "background.paper",
              height: "80vh",
              overflow: "auto",
            }}
          >
            {trending.map((multimedia) => {
              return (
                <>
                  <ListItem
                    alignItems="flex-start"
                    onClick={() => {
                      if (multimedia.media_type === "movie") {
                        navigate(`/movies/details?movieID=${multimedia.id}`);
                      }
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="square"
                        alt={
                          multimedia.title ? multimedia.title : multimedia.name
                        }
                        src={`https://image.tmdb.org/t/p/original${multimedia.poster_path}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        multimedia.title ? multimedia.title : multimedia.name
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {multimedia.media_type.toUpperCase()}
                          </Typography>
                          <Row style={{ alignItems: "center" }}>
                            <Col xs={9}>
                              <Rating
                                name="Rating"
                                size="small"
                                value={multimedia.vote_average}
                                precision={0.001}
                                max={10}
                                readOnly
                              />
                            </Col>
                            <Col>{`${JSON.stringify(
                              multimedia.vote_average
                            ).slice(0, 3)}/10`}</Col>
                          </Row>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              );
            })}
          </List>
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
