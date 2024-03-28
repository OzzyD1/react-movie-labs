import React from "react";
import { useParams } from "react-router-dom";
import { getPeopleDetails, getPeopleCredits } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import PeopleDetails from "../components/peopleDetails";

const PeopleDetailsPage = () => {
    const { id } = useParams();

    const { data, error, isLoading, isError } = useQuery(
        ["peopleDetailsPage", { id: id }],
        getPeopleDetails
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return data ? (
        <PeopleDetails data={data} />
    ) : (
        <p>Waiting for people details</p>
    );
};

export default PeopleDetailsPage;
