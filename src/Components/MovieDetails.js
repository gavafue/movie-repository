import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Button, Paper, Typography } from "@mui/material";
import Card2 from "@mui/joy/Card";
import CardCover2 from "@mui/joy/CardCover";
import CardContent2 from "@mui/joy/CardContent";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

const MovieDetails = () => {
  const MySwal = withReactContent(swAlert);
  const navigate = useNavigate();
  const location = useLocation();
  const [movieID, setMovieID] = useState("");
  const [movieDetailsData, setMovieDetailsData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productors, setProductors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const extendedInfoAPI = `https://api.themoviedb.org/3/movie/${movieID}?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US
    `;
  const similarMoviesAPI = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1`;

  useEffect(() => {

    const query = new URLSearchParams(location.search);
    const queryParamMovieID = query.get("movieID");
    setMovieID(queryParamMovieID);
    if (movieID !== "" && movieID !== undefined) {
      // Function to get info of the movie selected
      axios
        .get(extendedInfoAPI)
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
          MySwal.fire({
            title: "Oops!",
            text: `There was an error, please
       try again in a few moments. Error message:${error}`,
            icon: "error",
          })
        );

      //Function to get info about similar movies
      axios
        .get(similarMoviesAPI)
        .then((response) => {
          const dataSimilarMovies = response.data.results;
          setSimilarMovies(dataSimilarMovies.slice(0, 6));
        })
        .catch((error) =>
          MySwal.fire({
            title: "Oops!",
            text: `There was an error, please
   try again in a few moments. Error message:${error}`,
            icon: "error",
          })
        );
    }
    // eslint-disable-next-line
  }, [movieID]);

  return (
    <Container
      className="w-100"
      style={{ marginTop: "15px", marginBottom: "15px" }}
    >
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
                      <Rating
                        name="detailsRating"
                        size="small"
                        value={movieDetailsData?.vote_average || 0}
                        precision={0.5}
                        max={10}
                        readOnly
                      />
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
              <Paper
                elevation={3}
                style={{ marginTop: "15px", padding: "10px" }}
              >
                <h5>Suggestions</h5>
                <Row>
                  {similarMovies?.map((movie, index) => {
                    return (
                      <Col
                        key={index}
                        xs={6}
                        md={4}
                        lg={2}
                        style={{ marginBottom: "15px" }}
                      >
                        <Card2
                          sx={{ minHeight: "240px", cursor: "pointer" }}
                          onClick={() => {
                            setMovieID(movie.id);
                            navigate(`/movies/details?movieID=${movie.id}`);
                          }}
                        >
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
                              sx={{ color: "white", fontSize: "14px" }}
                            >
                              {movie.title}
                            </Typography>
                          </CardContent2>
                        </Card2>
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
