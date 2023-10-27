import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { Instagram, Facebook, Twitter, LinkedIn } from "@material-ui/icons";

const userStyle = makeStyles((theme) => ({
    content: {
        position: "sticky",
        top: "1em",
        maxHeight: "660px",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        padding: "1em",
        backgroundColor: "#fff",
        borderRadius: "0.5em",
    },
    part: {
        display: "flex",
        flexDirection: "column",
        padding: "0.5em",
    },
    author: {
        height: "100%",
        width: "100%",
        position: "relative",
        borderRadius: 5,
        // boxShadow: "0 0 5px #ccc",
        margin: "1em 0",
    },
    author__avatar: {
        display: "flex",
        width: "100%",
        borderRadius: "50%",
        justifyContent: "center",
    },
    avatarImg: {
        width: "150px",
        height: "150px",
        borderRadius: "50%",
    },
    imgIcon: {
        width: "30px",
        height: "30px",
        color: "#888888",
        marginRight: "0.5em",
    },
    spacing: {
        borderTop: "1px solid #ccc",
        marginTop: "1em", 
        margin: "0 0.5em"
    }
}));

const Author = () => {
    const classes = userStyle();
    return (
        <>
            <Grid item xs={12} className={classes.content}>
                <Grid item xs={12} className={classes.part}>
                    <div className={classes.author__avatar}>
                        <img
                            src="http://images.wikia.com/jamescameronsavatar/images/8/8e/Avatar-movie-wallpaper-1.jpg"
                            alt="Author avatar"
                            className={classes.avatarImg}
                        ></img>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.part}>
                    <Typography variant="inherit" style={{ fontSize: "20px" }}>
                        John Smith is a prolific author known for his compelling
                        storytelling and thought-provoking narratives.
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.spacing}></Grid>
                <Grid item xs={12} className={classes.part}>
                    <Typography variant="h6">Related Posts</Typography>
                    <Typography
                        variant="inherit"
                        style={{ marginTop: "0.5em", color: "#888888" }}
                    >
                        The Enchanted Chronicles: A Journey into a Magical Realm
                    </Typography>
                    <Typography
                        variant="inherit"
                        style={{ marginTop: "0.5em", color: "#888888" }}
                    >
                        Echoes of Love: A Tale of Romance and Redemption
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.spacing}></Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        display: "flex",
                        padding: "0 0.5em",
                        paddingTop: "1em",
                    }}
                >
                    <Instagram className={classes.imgIcon} />
                    <Facebook className={classes.imgIcon} />
                    <Twitter className={classes.imgIcon} />
                    <LinkedIn className={classes.imgIcon} />
                </Grid>
            </Grid>
        </>
    );
};

export default Author;
