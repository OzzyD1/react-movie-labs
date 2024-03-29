import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { auth } from "../auth/firebase";
import useAuth from "../hooks/useAuth";
import SnackbarComponent from "../components/addedToSnackbar";

const HomePage = (props) => {
    const userEmail = useAuth(auth);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery(
        ["discover", { page: currentPage }],
        getMovies
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const movies = data.results;

    const handleClick = () => {
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <>
            <PageTemplate
                title="Discover Movies"
                movies={movies}
                action={(movie) => {
                    return userEmail ? (
                        <>
                            <AddToFavoritesIcon
                                onAdd={handleClick}
                                movie={movie}
                            />
                            <AddToWatchlistIcon movie={movie} />
                        </>
                    ) : null;
                }}
            />
            <Paper>
                <Pagination
                    count={data.total_pages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                />
            </Paper>
            <SnackbarComponent
                open={snackbarOpen}
                handleClose={handleSnackbarClose}
                message="Movie added to favorites!"
            />
        </>
    );
};
export default HomePage;
