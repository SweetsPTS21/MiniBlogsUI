import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const userStyle = makeStyles((theme) => ({
    aboutPage: {
        borderRadius: "0.5em",
        // boxShadow: "0 0 5px #ccc",
    },
    about: {
        padding: "1em",
        textAlign: "left",
        backgroundColor: "#fff",
        borderRadius: "0.5em",
    },
    about__content: {
        margin: "1em 0",
    },
    button: {
        backgroundColor: "#888888",
        width: "150px",
        margin: "1em 0",
        "&:hover": {
            backgroundColor: "#aeaeae",
        },
    },
}));

const About = () => {
    const classes = userStyle();
    return (
        <>
            <Grid item xs={12} className={classes.aboutPage}>
                <Grid item xs={12} className={classes.about}>
                    <Grid item xs={12} className={classes.about__content}>
                        <Typography variant="h4" className={classes.title}>
                            About
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.about__content}>
                        <Typography variant="paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed euismod eu lorem et ultricies. In porta
                            lorem at dui semper porttitor. Nullam quis cursus
                            dui. Cras tincidunt vehicula tellus eu facilisis.
                            Donec nisi turpis, iaculis et arcu a, aliquet
                            ultrices nisl. Nam in pharetra odio, ac blandit
                            metus.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.about__content}>
                        <Typography variant="h6" className={classes.title}>
                            Something else
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.about__content}>
                        <Typography variant="paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed euismod eu lorem et ultricies. In porta
                            lorem at dui semper porttitor.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.loadmore}>
                        <Link to="/contact">
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Get in touch
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default About;
