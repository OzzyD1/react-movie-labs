import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { getPopularPeople } from "../api/tmdb-api";
import { Grid } from "@mui/material";
import Header from "../components/headerMovieList";

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

    return (
        <Grid container sx={{ padding: "20px" }}>
            <Grid item xs={12}>
                <Header title="Popular People" />
            </Grid>
            <Grid item container spacing={5}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}></Grid>
                {people.map((p) => (
                    <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                        {p.original_name}
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};
export default PopularPeople;
