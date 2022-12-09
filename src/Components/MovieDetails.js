import axios from "axios";
import { useEffect, useState } from "react";
import swAlert from "@sweetalert/with-react";
import { Container, Row, Col, Card } from "react-bootstrap";
const MovieDetails = () => {
  const [movieDetailsData, setMovieDetailsData] = useState([]);
  const [genres, setGenres] = useState([]);
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
                <Row>Sinopsis: {movieDetailsData.overview}</Row>
                <Row>Release Date: {movieDetailsData.release_date}</Row>
                <Row>Genres: {genres.join(", ")}.</Row>
                <Row>Popularity: {movieDetailsData.popularity}</Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
export default MovieDetails;
