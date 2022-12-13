import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import swAlert from "sweetalert2";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Button, Paper, Typography } from "@mui/material";
import Card2 from "@mui/joy/Card";
import CardCover2 from "@mui/joy/CardCover";
import CardContent2 from "@mui/joy/CardContent";
import { Link } from "react-router-dom";

const MovieDetails = () => {
  const [movieDetailsData, setMovieDetailsData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productors, setProductors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get("movieID");
    const extendedInfo = `https://api.themoviedb.org/3/movie/${movieID}?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US
    `;
    const similarMovies = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1`;
    // Function to get info of the movie selected
    axios
      .get(extendedInfo)
      .then((response) => {
        const data = response.data;
        setMovieDetailsData(data);
        const genresList = data.genres.map((genre) => genre.name);
        setGenres(genresList);
        const producersList = data.production_companies.map(
          (productor) => productor.name
        );
        setProductors(producersList);
        const filmedCountriesList = data.production_countries.map(
          (country) => country.name
        );
        setCountries(filmedCountriesList);
        const spokenLanguagesList = data.spoken_languages.map(
          (language) => language.english_name
        );
        setSpokenLanguages(spokenLanguagesList);
      })
      .catch((error) =>
        swAlert({
          title: "Oops!",
          text: `There was an error, please
       try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );

    //Function to get info about similar movies
    axios
      .get(similarMovies)
      .then((response) => {
        const dataSimilarMovies = response.data.results;
        setSimilarMovies(dataSimilarMovies.slice(0, 6));
      })
      .catch(
        (error) => console.log(error.message)
        //   swAlert({
        //     title: "Oops!",
        //     text: `There was an error, please
        //  try again in a few moments. Error message:${error}`,
        //     icon: "error",
        //   })
      );
  }, [setMovieDetailsData]);

  return (
    <Container className="w-100">
      <Card border="secondary">
        <Card.Header>
          <Card.Title>
            {movieDetailsData.title} ({movieDetailsData.original_title})
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <Card className="bg-dark text-white">
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/original${movieDetailsData.poster_path}`}
                    alt={`Poster image from ${movieDetailsData.original_title}`}
                  />
                </Card>
              </Col>
              <Col>
                <Row>
                  <Row>
                    <h5>Sinopsis:</h5>
                    <p>{movieDetailsData.overview}</p>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Release Date:</h6>
                      <p>{movieDetailsData.release_date}</p>
                    </Col>
                    <Col>
                      <h6>Genres:</h6>
                      <p>{genres.join(", ")}.</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Popularity:</h6>
                      <p>{movieDetailsData.popularity}</p>
                      <p></p>
                    </Col>
                    <Col>
                      <h6>Productor companies:</h6>
                      <p>{productors.join(", ")}.</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Countries filmed in:</h6>
                      <p> {countries.join(", ")}.</p>
                    </Col>
                    <Col>
                      <h6>Spoken languages:</h6>
                      <p>{spokenLanguages.join(", ")}.</p>
                    </Col>
                  </Row>
                </Row>
                {movieDetailsData.homepage && (
                  <Row>
                    <Col className="justify-content-center text-center">
                      <a href={movieDetailsData.homepage}>
                        <Button
                          variant="contained"
                          style={{ marginTop: "15px" }}
                        >
                          More details
                        </Button>
                      </a>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row>
              <Paper>
                <h5>Similar movies</h5>
                <Row>
                  {similarMovies?.map((movie, index) => {
                    return (
                      <Col key={index}>
                        <Link to={`/movies/details?movieID=${movie.id}`}>
                          <Card2 sx={{ minHeight: "260px" }}>
                            <CardCover2>
                              <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                srcSet={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                loading="lazy"
                                alt={movie.title}
                              />
                            </CardCover2>
                            <CardCover2
                              sx={{
                                background:
                                  "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
                              }}
                            />
                            <CardContent2
                              sx={{
                                justifyContent: "flex-end",
                                textAlign: "center",
                              }}
                            >
                              <Typography
                                level="h2"
                                fontSize="lg"
                                mb={1}
                                sx={{ color: "white" }}
                              >
                                {movie.title}
                              </Typography>
                            </CardContent2>
                          </Card2>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              </Paper>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default MovieDetails;
