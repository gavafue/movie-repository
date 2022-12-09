import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import swAlert from "sweetalert2";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const MovieDetails = () => {
  const [movieDetailsData, setMovieDetailsData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [productors, setProductors] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    let query = new URLSearchParams(window.location.search);
    let movieID = query.get("movieID");
    const endpoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US
    `;

    axios
      .get(endpoint)
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
      })
      .catch((error) =>
        swAlert({
          title: "Oops!",
          text: `There was an error, please
       try again in a few moments. Error message:${error}`,
          icon: "error",
        })
      );
  }, []);

  return (
    <Container>
      <Card border="secondary">
        <Card.Header>
          <Card.Title>
            {movieDetailsData.title} ({movieDetailsData.original_title})
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col xs={12} sm={4}>
                <Card className="bg-dark text-white">
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/w500${movieDetailsData.poster_path}`}
                    alt={`Poster image from ${movieDetailsData.original_title}`}
                  />
                </Card>
              </Col>
              <Col>
                <Row>
                  <Row>Sinopsis: {movieDetailsData.overview}</Row>
                  <Row>Release Date: {movieDetailsData.release_date}</Row>
                  <Row>Genres: {genres.join(", ")}.</Row>
                  <Row>Popularity: {movieDetailsData.popularity}</Row>
                  <Row>Productor companies: {productors.join(", ")}.</Row>
                  <Row>Countries filmed in: {countries.join(", ")}.</Row>
                </Row>
                {movieDetailsData.homepage && (
                  <Container>
                    <br />
                    <Row>
                      <a href={movieDetailsData.homepage}>
                        <Button variant="primary">Know more details</Button>
                      </a>
                    </Row>{" "}
                  </Container>
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default MovieDetails;
