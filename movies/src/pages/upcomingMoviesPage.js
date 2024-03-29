import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { auth } from "../auth/firebase";
import useAuth from "../hooks/useAuth";

const UpcomingMoviesPage = (props) => {
    const userEmail = useAuth(auth);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(
        ["upcoming", { page: currentPage }],
        getUpcomingMovies
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const movies = data.results;

    return (
        <>
            <PageTemplate
                title="Upcoming Movies"
                movies={movies}
                action={(movie) => {
                    return userEmail ? (
                        <>
                            <AddToFavoritesIcon movie={movie} />
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
        </>
    );
};

export default UpcomingMoviesPage;
