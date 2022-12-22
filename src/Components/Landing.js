import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";

// import Carousel from "react-bootstrap/Carousel";
import axios from "axios";
import React from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Chip,
  Rating,
} from "@mui/material";
import CardJoy from "@mui/joy/Card";
import CardCoverJoy from "@mui/joy/CardCover";
import CardContentJoy from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import AspectRatio from "@mui/joy/AspectRatio";
import { useNavigate } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Carousel } from "antd";
const Landing = () => {
  const MySwal = withReactContent(swAlert);
  const navigate = useNavigate();
  const [popularFilms, setPopularFilms] = useState([]);
  const [trending, setTrending] = useState([]);
  const [genres, setGenresList] = useState([]);
  const [nextMovies, setNextMovies] = useState([]);
  const fecha = new Date();
  const diaActual = fecha.getDate();
  const mesActual = fecha.getMonth() + 1;
  const añoActual = fecha.getFullYear();
  const popularFilmsURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1";
  const trendingURL =
    "https://api.themoviedb.org/3/trending/all/day?api_key=51b3e2f36ad739cff7692a885496b3f8";
  const nextMoviesAPI = `https://api.themoviedb.org/3/discover/movie?api_key=51b3e2f36ad739cff7692a885496b3f8&primary_release_date.gte=${añoActual}-${mesActual}-${diaActual}&sort_by=popularity.desc`;
  const genresAPI =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US";
  useEffect(() => {
    axios

      .get(genresAPI)
      .then((response) => {
        const apiData = response.data.genres;
        setGenresList(apiData);
      })
      .catch((error) =>
        MySwal.fire({
          title: "Oops!",
          text: `There was an error, please
   try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );

    axios
      .get(popularFilmsURL)
      .then((response) => {
        const apiData = response.data.results
          .sort((x, y) => (x.popularity = y.popularity))
          .slice(0, 6);
        setPopularFilms(apiData);
      })
      .catch((error) =>
        MySwal.fire({
          title: "Oops!",
          text: `There was an error, please
   try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );

    axios
      .get(trendingURL)
      .then((response) => {
        const apiData = response.data.results.slice(0, 10);
        setTrending(apiData);
      })
      .catch((error) =>
        MySwal.fire({
          title: "Oops!",
          text: `There was an error, please
   try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );
    axios
      .get(nextMoviesAPI)
      .then((response) => {
        const apiData = response.data.results;
        const onlyWithBackDropImage = apiData
          .filter(
            (movie) =>
              movie.backdrop_path !== "" && movie.backdrop_path !== null
          )
          .slice(0, 12);
        setNextMovies(onlyWithBackDropImage);
      })
      .catch((error) =>
        MySwal.fire({
          title: "Oops!",
          text: `There was an error, please
   try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );
    // eslint-disable-next-line
  }, []);

  return (
    <Container style={{ marginTop: "10px" }}>
      <Row>
        <Col xs={12} lg={7}>
          <h5 className="text-center">Top 6 movies</h5>
          <Carousel autoplay arrows autoplaySpeed={2500}>
            {popularFilms?.map((film, index) => {
              return (
                <div key={index}>
                  <CardJoy
                    sx={{ minHeight: "80vh", cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/movies/details?movieID=${film.id}`)
                    }
                  >
                    <CardCoverJoy>
                      <img
                        className="d-none d-sm-flex"
                        style={{ width: "100%", minHeight: "100%" }}
                        src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                        srcSet={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                        loading="lazy"
                        alt={film.title}
                      />
                      <img
                        className="d-block d-sm-flex"
                        style={{ width: "100%", minHeight: "100%" }}
                        src={`https://image.tmdb.org/t/p/original${film.poster_path}`}
                        srcSet={`https://image.tmdb.org/t/p/original${film.poster_path}`}
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
                      <Row>
                        <Col className="mx-auto">
                          <Row
                            className="d-flex justify-content-center align-items-center"
                            style={{ marginBottom: "15px" }}
                          >
                            {film.genre_ids.map((eachGenreId, idx) => {
                              const thisGenre = genres.find(
                                (genre) => genre.id === eachGenreId
                              );
                              return (
                                <Chip
                                  color="secondary"
                                  size="small"
                                  style={{ width: `80px`, margin: "2px" }}
                                  key={idx}
                                  label={thisGenre.name}
                                />
                              );
                            })}
                          </Row>
                        </Col>
                      </Row>
                    </CardContentJoy>
                  </CardJoy>
                </div>
              );
            })}
          </Carousel>
        </Col>
        <Col xs={12} lg={5}>
          <h5 className="text-center">Trending list</h5>
          <Container style={{ height: "75vh" }}>
            <Paper>
              <ImageList sx={{ width: "100%", height: "75vh" }} cols={2}>
                {trending.map((item, index) => {
                  return (
                    <ImageListItem key={index}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                        srcSet={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                        alt={item.title ? item.title : item.name}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={item.title ? item.title : item.name}
                        subtitle={
                          <Row className="d-flex justify-content-center align-items-center">
                            <Col>
                              <Rating
                                name="read-only"
                                value={item.vote_average * 0.5}
                                max={5}
                                precision={0.5}
                                readOnly
                                size="small"
                              />
                              {`${JSON.stringify(item.vote_average / 2).slice(
                                0,
                                3
                              )}/5`}
                            </Col>
                          </Row>
                        }
                        actionIcon={
                          <IconButton
                            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                            aria-label={`info about ${
                              item.title ? item.title : item.name
                            }`}
                            onClick={() => {
                              if (item.title) {
                                navigate(`/movies/details?movieID=${item.id}`);
                              } else {
                                navigate(`/series/details?serieID=${item.id}`);
                              }
                            }}
                          >
                            <InfoIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </Paper>
          </Container>
        </Col>
      </Row>
      <Row style={{ marginTop: "10px" }}>
      <h5 className="text-center">Upcoming movies.</h5>
        <Container>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Carousel
                className="d-none d-lg-block "
                autoplay
                arrows
                autoplaySpeed={2000}
                dotPosition="right"
              >
                {[
                  [0, 3],
                  [3, 6],
                  [6, 9],
                  [9, 12],
                ].map((slide, index) => (
                  <div key={index}>
                    <Row>
                      {nextMovies
                        .slice(slide[0], slide[1])
                        .map((movie, index) => (
                          <Col
                            xs={4}
                            className="d-flex align-items-center"
                            key={index}
                          >
                            <CardJoy
                              variant="outlined"
                              onClick={() =>
                                navigate(`/movies/details?movieID=${movie.id}`)
                              }
                              style={{ cursor: "pointer" }}
                              sx={{ width: "100%" }}
                            >
                              <CardOverflow>
                                <AspectRatio ratio="2">
                                  <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    srcSet={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    loading="lazy"
                                    alt={movie.title}
                                  />
                                </AspectRatio>
                              </CardOverflow>
                              <Typography
                                level="h3"
                                sx={{
                                  fontSize: "md",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  mt: 2,
                                }}
                              >
                                {movie.title}
                              </Typography>
                              <CardOverflow
                                variant="soft"
                                sx={{
                                  display: "flex",
                                  gap: 1.5,
                                  py: 1.5,
                                  px: "var(--Card-padding)",
                                  bgcolor: "#212529",
                                }}
                              >
                                <Typography
                                  level="h3"
                                  style={{
                                    fontWeight: "md",
                                    color: "white",
                                  }}
                                >
                                  Release date:
                                </Typography>
                                <Divider orientation="vertical" />
                                <Typography
                                  level="body3"
                                  sx={{ fontWeight: "md", color: "white" }}
                                >
                                  {movie.release_date}
                                </Typography>
                              </CardOverflow>
                            </CardJoy>
                          </Col>
                        ))}
                    </Row>
                  </div>
                ))}
              </Carousel>
              <Carousel
                className="d-xs-block d-lg-none "
                autoplay
                arrows
                autoplaySpeed={2000}
                dotPosition="right"
              >
                {[
                  [0, 2],
                  [2, 4],
                  [4, 6],
                  [6, 8],
                  [8, 10],
                  [10, 12],
                ].map((slide, index) => (
                  <div key={index}>
                    <Row>
                      {nextMovies
                        .slice(slide[0], slide[1])
                        .map((movie, index) => (
                          <Col
                            xs={6}
                            className="d-flex align-items-center"
                            key={index}
                          >
                            <CardJoy
                              variant="outlined"
                              onClick={() =>
                                navigate(`/movies/details?movieID=${movie.id}`)
                              }
                              style={{ cursor: "pointer" }}
                              sx={{ width: "100%" }}
                            >
                              <CardOverflow>
                                <AspectRatio ratio="2">
                                  <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    srcSet={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                    loading="lazy"
                                    alt={movie.title}
                                  />
                                </AspectRatio>
                              </CardOverflow>
                              <Typography
                                sx={{
                                  fontSize: "md",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                  mt: 2,
                                }}
                              >
                                {movie.title}
                              </Typography>
                              <CardOverflow
                                variant="soft"
                                sx={{
                                  display: "flex",
                                  gap: 1.5,
                                  py: 1.5,
                                  px: "var(--Card-padding)",
                                  bgcolor: "#212529",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontWeight: "md",
                                    color: "white",
                                  }}
                                >
                                  Release date:
                                </Typography>
                                <Divider orientation="vertical" />
                                <Typography
                                  level="body3"
                                  sx={{ fontWeight: "md", color: "white" }}
                                >
                                  {movie.release_date}
                                </Typography>
                              </CardOverflow>
                            </CardJoy>
                          </Col>
                        ))}
                    </Row>
                  </div>
                ))}
              </Carousel>
            </CardContent>
          </Card>
        </Container>
      </Row>
    </Container>
  );
};
export default Landing;
