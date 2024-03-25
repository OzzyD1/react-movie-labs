import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const MovieCredits = ({ credits }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 2,
            }}
        >
            {credits.cast.map((c) => (
                <List key={c.id}>
                    <Paper sx={{ backgroundColor: "#ededed" }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar
                                    src={`https://image.tmdb.org/t/p/w92/${c.profile_path}`}
                                    alt=""
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={c.name}
                                secondary={c.character}
                            />
                        </ListItem>
                    </Paper>
                </List>
            ))}
        </Box>
    );
};

export default MovieCredits;
