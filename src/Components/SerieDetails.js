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

const SerieDetails = () => {
  const MySwal = withReactContent(swAlert);
  const navigate = useNavigate();
  const location = useLocation();
  const [serieID, setSerieID] = useState("");
  const [serieDetailsData, setSerieDetailsData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productors, setProductors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [spokenLanguages, setSpokenLanguages] = useState([]);
  const [similarSeries, setSimilarSeries] = useState([]);
  const [videoTrailer, setVideoTrailer] = useState(undefined);

  const extendedInfoAPI = `https://api.themoviedb.org/3/tv/${serieID}?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US`;

  const similarSeriesAPI = `https://api.themoviedb.org/3/tv/${serieID}/similar?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1`;
  const videosApi = `https://api.themoviedb.org/3/tv/${serieID}/videos?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US`;
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const queryParamMovieID = query.get("serieID");
    setSerieID(queryParamMovieID);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (serieID !== "" && serieID !== undefined) {
      // Function to get info of the movie selected
      axios
        .get(extendedInfoAPI)
        .then((response) => {
          const data = response.data;
          setSerieDetailsData(data);
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
        .get(similarSeriesAPI)
        .then((response) => {
          const dataSimilarMovies = response.data.results;
          setSimilarSeries(dataSimilarMovies.slice(0, 6));
        })
        .catch((error) =>
          MySwal.fire({
            title: "Oops!",
            text: `There was an error, please
   try again in a few moments. Error message:${error}`,
            icon: "error",
          })
        );
      //Function to get video trailer
      axios
        .get(videosApi)
        .then((response) => {
          const dataVideos = response.data.results;

          if (dataVideos) {
            const trailer = dataVideos.find(
              (video) => video.type === "Trailer"
            );
            if (trailer) {
              setVideoTrailer(trailer);
            } else {
              setVideoTrailer(undefined);
            }
          }
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
    console.log(serieDetailsData);
    // eslint-disable-next-line
  }, [serieID, window.location.search]);
  console.log(videoTrailer);
  return (
    <Container
      className="w-100"
      style={{ marginTop: "15px", marginBottom: "15px" }}
    >
      <Card border="secondary">
        <Card.Header>
          <Card.Title>
            {serieDetailsData.name} ({serieDetailsData.original_name})
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={12} md={4}>
                <Card className="bg-dark text-white">
                  <Card.Img
                    src={
                      serieDetailsData.poster_path
                        ? `https://image.tmdb.org/t/p/original${serieDetailsData.poster_path}`
                        : `http://via.placeholder.com/700x1000.png?text=Without+poster+image`
                    }
                    alt={`Poster image from ${serieDetailsData.original_name}`}
                  />
                </Card>
              </Col>
              <Col>
                <Row>
                  <Row>
                    <h5>Sinopsis:</h5>
                    <p>{serieDetailsData.overview}</p>
                  </Row>
                  <Row>
                    <Col>
                      <h6>First air date:</h6>
                      <p>{serieDetailsData.first_air_date}</p>
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
                        value={serieDetailsData?.vote_average || 0}
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
                  <Row>
                    <Col>
                      <h6>Number of seasons:</h6>
                      <p> {serieDetailsData.number_of_seasons}.</p>
                    </Col>
                    <Col>
                      <h6>Number of episodes:</h6>
                      <p>{serieDetailsData.number_of_episodes}.</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6>Status:</h6>
                      <p>{serieDetailsData.status}.</p>
                    </Col>
                  </Row>
                </Row>
                {serieDetailsData.homepage && (
                  <Row>
                    <Col className="justify-content-center text-center">
                      <a href={serieDetailsData.homepage}>
                        <Button
                          variant="contained"
                          style={{ marginTop: "15px" }}
                        >
                          Official site
                        </Button>
                      </a>
                    </Col>
                  </Row>
                )}
                {videoTrailer && (
                  <Row>
                    <h5>Trailer:</h5>
                    <iframe
                      title={videoTrailer.name}
                      id="player"
                      type="text/html"
                      width="100%"
                      height="400"
                      src={`http://www.youtube.com/embed/${videoTrailer.key}?origin=http://localhost:3000/`}
                    ></iframe>
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
                  {similarSeries?.map((serie, index) => {
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
                            setSerieID(serie.id);
                            navigate(`/series/details?serieID=${serie.id}`);
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          <CardCover2>
                            <img
                              src={
                                serie.poster_path
                                  ? `https://image.tmdb.org/t/p/original${serie.poster_path}`
                                  : `http://via.placeholder.com/700x1000.png?text=Without+poster+image`
                              }
                              srcSet={
                                serie.poster_path
                                  ? `https://image.tmdb.org/t/p/original${serie.poster_path}`
                                  : `http://via.placeholder.com/700x1000.png?text=Without+poster+image`
                              }
                              loading="lazy"
                              alt={serie.name}
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
                              {serie.name}
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
export default SerieDetails;
