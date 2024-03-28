import React from "react";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

const PeopleDetails = ({ data }) => {
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Paper sx={{ ...root }}>
                        <Avatar
                            src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`}
                            alt={data.name}
                            sx={{ width: "80%", height: "80%" }}
                            variant="square"
                        />
                    </Paper>
                </Grid>

                <Grid item xs={7}>
                    <Paper sx={{ ...root }}>
                        <Typography variant="h3">{data.name}</Typography>
                        <Divider />
                    </Paper>
                    <Paper sx={{ ...root }}>
                        <Chip label="Born" sx={{ ...chip }} color="primary" />
                        <Chip label={data.birthday} sx={{ ...chip }} />
                        {data.deathday ? (
                            <>
                                <Chip
                                    label="Died"
                                    sx={{ ...chip }}
                                    color="primary"
                                />
                                <Chip label={data.deathday} sx={{ ...chip }} />
                            </>
                        ) : null}
                    </Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper sx={{ ...root }}>
                        <Chip
                            label="Know For"
                            sx={{ ...chip }}
                            color="primary"
                        />
                        <Chip
                            label={data.known_for_department}
                            sx={{ ...chip }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ ...root }}>
                        <Typography variant="body1">
                            {data.biography}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default PeopleDetails;
