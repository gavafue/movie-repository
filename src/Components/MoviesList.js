import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "@sweetalert/with-react";
import { Link } from "react-router-dom";

const Routes = () => {
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
          <Col xs={3}>
            <Card key={index} id={index}>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{oneMovie.title}</Card.Title>
                <Card.Text>{oneMovie.overview.substring(0, 100)}...</Card.Text>
                <Link className="text-center"to={`/details?movieID=${oneMovie.id}`}>
                  <Button className="text-center" variant="secondary">View details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Routes;
