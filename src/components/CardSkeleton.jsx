import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

/**
 * CardSkeleton is a flexible card component that displays an icon, title, subtitle,
 * and a link to view more details. It is used to present summarized information with
 * a visual icon and an option to navigate for further details.
 *
 * @param {string} id - The unique identifier for the card (used for testing).
 * @param {React.ElementType} icon - The icon component to be displayed at the top of the card.
 * @param {string} title - The title text displayed prominently in the card.
 * @param {string} subtitle - The subtitle text displayed beneath the title.
 * @param {string} cardColor - The background color of the card.
 * @param {string} readMoreLink - The URL that the "VIEW DETAILS" link will navigate to.
 *
 * @returns {JSX.Element} A memoized card component with an icon, title, subtitle, and a "VIEW DETAILS" link.
 */
const CardSkeleton = ({
  id,
  icon: Icon,
  title,
  subtitle,
  cardColor,
  readMoreLink,
}) => {
  return (
    <Card
      data-testid={id}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        backgroundColor: cardColor,
        boxShadow: "none",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={2}>
              <Icon sx={{ fontSize: 40 }} />
            </Grid>
            <Grid item xs={10} sx={{ textAlign: "right" }}>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {subtitle}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 2, pb: 2 }}>
          <Typography
            component="a"
            href={readMoreLink}
            rel="noopener noreferrer"
            sx={{
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
              fontSize: 13,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            VIEW DETAILS
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default React.memo(CardSkeleton);
