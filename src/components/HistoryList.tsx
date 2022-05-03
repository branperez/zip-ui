import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { History } from "../types";

const historyItems = ({ postCode, city, state, timeStamp }: History) => {
    const date = new Date(timeStamp * 1000)

    return (
        <ListItem key={timeStamp}>
            <ListItemText
                primary={`${city}, ${state}`}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                        >
                            {postCode} -- created at: 
                        </Typography>
                        {`  ${date.toLocaleString()}`}
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

const HistoryList = ({ previous }: { previous: History[] }) => {
    const historyList = previous.map(historyItems)

    return (
        <Box>
            <List>
                { historyList }
            </List>
        </Box>
    )
}

export default HistoryList