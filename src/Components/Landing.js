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
import { Paper, Typography } from "@mui/material";

const Landing = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const [popularFilms, setPopularFilms] = useState([]);
  const URL =
    "https://api.themoviedb.org/3/movie/popular?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1";
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        const apiData = response.data.results;
        setPopularFilms(apiData);
      })
      .catch((error) => console.log(error));
  }, [setPopularFilms]);

  return (
    <Container>
      <Row>
        <Col xs={12} md={8}>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="mx-auto"
            interval={1000}
          >
            {popularFilms?.map((film, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                    alt={film.title}
                  />
                  <Carousel.Caption>
                    <Paper
                      variant="outlined"
                      sx={{ backgroundColor: "rgb(255 255 255 / 70%)" }}
                    >
                      <Typography variant="h5" gutterBottom>
                        {film.title}
                      </Typography>
                    </Paper>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
        <Col xs={12} md={4}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </Col>
      </Row>
    </Container>
  );
};
export default Landing;
