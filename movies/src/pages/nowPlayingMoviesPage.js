import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";

const NowPlayingMoviesPage = (props) => {
    const { data, error, isLoading, isError } = useQuery(
        "now playing",
        getNowPlayingMovies
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const movies = data.results;

    // Redundant, but necessary to avoid app crashing.
    const favorites = movies.filter((m) => m.favorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));

    return (
        <PageTemplate
            title="Now Playing"
            movies={movies}
            action={(movie) => {
                return <AddToWatchlistIcon movie={movie} />;
            }}
        />
    );
};

export default NowPlayingMoviesPage;
