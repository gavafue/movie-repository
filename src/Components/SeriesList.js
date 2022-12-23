import Row from "react-bootstrap/Row";
import React from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import axios from "axios";
import swAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  TextField,
  Paper,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Pagination } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Dropdown from "react-bootstrap/Dropdown";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
const MySwal = withReactContent(swAlert);

const SeriesList = () => {
  const navigate = useNavigate();
  const [genresList, setGenresList] = useState([]);
  const [seriesList, setSeriesList] = useState([]);
  const [genreID, setGenreID] = useState(10759);
  const [selectedGenre, setSelectedGenre] = useState("Action & Adventure");
  const [page, setPage] = useState(1);
  const [search, setSearchInput] = useState("");
  const [sortSeriesBy, setSeriesSortBy] = useState("popularity.desc");
  const fecha = new Date();
  const dia = fecha.getDate();
  const mesActual = fecha.getMonth() + 1;
  const año = fecha.getFullYear();

  const handleChangePages = (event, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const genresAPI =
      "https://api.themoviedb.org/3/genre/tv/list?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US";
    const discoverTVProgramsAPI = `https://api.themoviedb.org/3/discover/tv?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&sort_by=${sortSeriesBy}&first_air_date.lte=${año}-${mesActual}-${dia}&page=${page}&with_genres=${genreID}&include_null_first_air_dates=false`;

    const searchApi = `https://api.themoviedb.org/3/search/tv?api_key=51b3e2f36ad739cff7692a885496b3f8&language=en-US&page=1&query=${search}&include_adult=false`;
    axios
      // eslint-disable-next-line
      .get(genresAPI)
      .then((response) => {
        const apiData = response.data.genres;
        setGenresList(apiData);
      })
      .catch((error) => MySwal.fire({
        title: "Oops!",
        text: `There was an error, please
   try again in a few moments. Error message:${error}`,
        icon: "error",
      }));
    if ((search !== null) & (search !== "")) {
      axios
        // eslint-disable-next-line
        .get(searchApi)
        .then((response) => {
          const apiData = response?.data;
          setSeriesList(apiData);
        })
        .catch((error) =>
          MySwal.fire({
            icon: "error",
            title: "Ooops!...",
            text: `There were an error: ${error}`,
          })
        );
    } else {
      axios
        // eslint-disable-next-line
        .get(discoverTVProgramsAPI)
        .then((response) => {
          const apiData = response.data;
          setSeriesList(apiData);
        })
        .catch((error) =>
          MySwal.fire({
            icon: "error",
            title: "Ooops!...",
            text: `There were an error: ${error}`,
          })
        );
    }
    // eslint-disable-next-line
  }, [genreID, page, search,sortSeriesBy]);

  return (
    <Row>
      <Col>
        <Row>
          <Container>
            <Card
              style={{
                marginTop: "10px",
                backgroundColor: "#212529",
                color: "white",
              }}
            >
              <Row>
                <Col className="d-block d-md-none" xs={2}>
                  {" "}
                  <Button
                    variant="contained"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    size="large"
                    sx={{ height: "100%" }}
                  >
                    <MenuOpenRoundedIcon
                      sx={{ color: "white", fontSize: "40px" }}
                    />
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {" "}
                    {genresList?.map((genre, index) => (
                      <MenuItem
                        key={index + 1}
                        onClick={() => {
                          handleClose();
                          setGenreID(genre?.id);
                          setSelectedGenre(genre?.name);
                          setPage(1);
                        }}
                      >
                        {genre?.name}
                      </MenuItem>
                    ))}
                  </Menu>
                </Col>
                <Col>
                  <h4 style={{ margin: "10px", textAlign: "center" }}>
                    SERIES
                  </h4>
                  <h6 style={{ margin: "10px", textAlign: "center" }}>
                    {selectedGenre}
                  </h6>
                </Col>
              </Row>
            </Card>
          </Container>
        </Row>
        <Row>
          <Container>
            <Paper style={{ margin: "10px 0px 10px 0px" }}>
              <Row>
                <Col md={4} xs={8} className="d-flex align-items-center">
                  <TextField
                    id="outlined-basic"
                    label={`Search`}
                    variant="outlined"
                    size="small"
                    onChange={handleChangeSearchInput}
                    fullWidth
                  />
                  <SearchIcon />
                </Col>

                {!search && (
                  <Col className="d-flex justify-content-end">
                    <Dropdown className="d-inline mx-2">
                      <Dropdown.Toggle
                        id="dropdown-autoclose-true"
                        variant="secondary"
                      >
                        Order by
                      </Dropdown.Toggle>

                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item
                          active={sortSeriesBy === "popularity.desc"}
                          onClick={() => setSeriesSortBy("popularity.desc")}
                          as="button"
                          eventKey="popularity"
                        >
                          Popularity
                        </Dropdown.Item>
                        <Dropdown.Item
                          active={sortSeriesBy === "first_air_date.desc"}
                          onClick={() => setSeriesSortBy("first_air_date.desc")}
                          as="button"
                          eventKey="recent"
                        >
                          Release date
                        </Dropdown.Item>
                        <Dropdown.Item
                          active={sortSeriesBy === "original_title.asc"}
                          onClick={() => setSeriesSortBy("original_title.asc")}
                          as="button"
                          eventKey="alphabetical"
                        >
                          Alphabetical
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                )}
              </Row>
            </Paper>
          </Container>
        </Row>
        <Row>
          {seriesList.results?.map((oneMovie, index) => {
         
            return (
              <Col
                xs={6}
                md={4}
                lg={3}
                key={index}
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <Card style={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={
                        oneMovie?.poster_path
                          ? `https://image.tmdb.org/t/p/original${oneMovie?.poster_path}`
                          : `http://via.placeholder.com/700x1000.png?text=Without+poster+image`
                      }
                      alt={oneMovie?.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {oneMovie?.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {oneMovie?.overview?.substring(0, 80)}...
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() =>
                        navigate(`/series/details?serieID=${oneMovie?.id}`)
                      }
                    >
                      View details
                    </Button>
                  </CardActions>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="d-flex justify-content-center text-center">
          <Pagination
            style={{ padding: "15px" }}
            variant="outlined"
            count={seriesList.total_pages < 500 ? seriesList?.total_pages : 500}
            page={page}
            onChange={handleChangePages}
          />
        </div>
      </Col>
      <Col className="d-none d-md-block" md={3} lg={2}>
        <List>
          {" "}
          <Divider style={{ marginTop: "10px" }} />
          {genresList?.map((genre) => (
            <>
              <ListItem
                key={genre?.id}
                onClick={() => {
                  setGenreID(genre?.id);
                  setSelectedGenre(genre?.name);
                  setPage(1);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemText primary={genre?.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </Col>
    </Row>
  );
};

export default SeriesList;
