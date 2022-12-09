import { Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Routes = () => {
  let token = localStorage.getItem("token");
  const [movieList, setMovieList] = useState([]);
  useEffect(() => {
    const endpoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=51b3e2f36ad739cff7692a885496b3f8&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";

    axios.get(endpoint).then((promise) => {
      const apiData = promise.data.results;
      setMovieList(apiData);
    });
  }, [setMovieList]);
  console.log(movieList);
  if (!token) {
    return <Navigate replace to="/"></Navigate>;
  }

  if (token) {
    return (
      <Row>
        {movieList.map((oneMovie, index) => {
          return (
            <Col xs={3}>
              <Card id={index}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${oneMovie.poster_path}`} />
                <Card.Body>
                  <Card.Title>{oneMovie.title}</Card.Title>
                  <Card.Text>{oneMovie.overview}</Card.Text>
                  <Button variant="primary">View detail</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
};

export default Routes;
