import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import Grid from "@mui/material/Unstable_Grid2";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: "0.9em 0 .5em 0",
    backgroundColor: "#D4D2D5",
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Paper sx={{ ...root }}>
                        <Typography variant="body1" component="p">
                            {movie.overview}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={4}>
                    <Paper component="ul" sx={{ ...root }}>
                        <li>
                            <Chip
                                label="Genres"
                                sx={{ ...chip }}
                                color="primary"
                            />
                        </li>
                        {movie.genres.map((g) => (
                            <li key={g.name}>
                                <Chip label={g.name} sx={{ ...chip }} />
                            </li>
                        ))}
                    </Paper>

                    <Paper component="ul" sx={{ ...root }}>
                        <Chip
                            icon={<AccessTimeIcon />}
                            label={`${movie.runtime} min.`}
                        />
                        <Chip
                            icon={<MonetizationIcon />}
                            label={`${movie.revenue.toLocaleString()}`}
                        />
                        <Chip
                            icon={<StarRate />}
                            label={`${movie.vote_average} (${movie.vote_count}`}
                        />
                        <Chip label={`Released: ${movie.release_date}`} />
                    </Paper>

                    <Paper component="ul" sx={{ ...root }}>
                        <li>
                            <Chip
                                label="Production Countries"
                                sx={{ ...chip }}
                                color="primary"
                            />
                        </li>
                        {movie.production_countries.map((c) => (
                            <li key={c.name}>
                                <Chip label={c.name} sx={{ ...chip }} />
                            </li>
                        ))}
                    </Paper>
                </Grid>
            </Grid>

            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: "fixed",
                    bottom: "1em",
                    right: "1em",
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <MovieReviews movie={movie} />
            </Drawer>
        </>
    );
};
export default MovieDetails;
