import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getPopularPeople } from "../api/tmdb-api";

const PopularPeople = (props) => {
    const { data, error, isLoading, isError } = useQuery(
        "popular",
        getPopularPeople
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const people = data.results;

    // Redundant, but necessary to avoid app crashing.
    // const favorites = movies.filter((m) => m.favorite);
    // localStorage.setItem("favorites", JSON.stringify(favorites));

    return <PageTemplate title="Popular People" people={people} />;
};
export default PopularPeople;
