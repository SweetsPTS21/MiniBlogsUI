import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as blogActions from "../blogs/actions/BlogActions";

const userStyle = makeStyles((theme) => ({
    detailPage: {
        borderRadius: "0.5em",
        backgroundColor: "#fff",
        // boxShadow: "0 0 5px #ccc",
    },
    details: {
        padding: "1em",
        textAlign: "left",
    },
    details__header: {
        padding: "0.5em 0",
    },
    date: {
        color: "#888888",
        paddingTop: "0.5em",
        paddingBottom: "1em",
        borderBottom: "3px solid #ccc",
    },
    category: {
        color: "#888888",
        padding: "0 0.5em",
        borderLeft: "3px solid #ccc",
        marginLeft: "0.5em",
    },
    details__body: {
        padding: "0.5em 0",
    },

    details__content: {
        padding: "1em 0",
    },
    button: {
        backgroundColor: "#888888",
        margin: "1em 0",
        "&:hover": {
            backgroundColor: "#aeaeae",
        },
    },
    cover: {
        height: "250px",
    },
}));

const BlogDetails = () => {
    const dispatch = useDispatch();
    const classes = userStyle();
    const navigate = useNavigate();
    const { id } = useParams();
    const blog = useSelector((state) => state.blogs.blog);

    useEffect(() => {
        dispatch(blogActions.getBlogById(id));
    }, [id, navigate]);

    return (
        <>
            <Grid item xs={12} className={classes.detailPage}>
                {blog ? (
                    <>
                        <Grid item xs={12} className={classes.details__cover}>
                            <img
                                src={blog.image}
                                alt="Author avatar"
                                className={classes.cover}
                            ></img>
                        </Grid>
                        <Grid item xs={12} className={classes.details}>
                            <Grid
                                item
                                xs={12}
                                className={classes.details__header}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    className={classes.details__content}
                                >
                                    <Typography
                                        variant="h4"
                                        className={classes.title}
                                    >
                                        {blog.title}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    className={classes.details__content}
                                >
                                    <Typography
                                        variant="paragraph"
                                        className={classes.date}
                                    >
                                        {blog.publicDate}
                                    </Typography>
                                    <Typography
                                        variant="paragraph"
                                        className={classes.category}
                                    >
                                        {blog.categories}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    className={classes.details__content}
                                >
                                    <Typography
                                        variant="paragraph"
                                        className={classes.title}
                                    >
                                        {blog.summary}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                className={classes.details__body}
                            >
                                {blog.content.map((item, index) => (
                                    <>
                                        <Grid
                                            item
                                            xs={12}
                                            className={classes.details__content}
                                        >
                                            <Typography
                                                variant="h6"
                                                className={classes.title}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="paragraph"
                                                className={classes.title}
                                            >
                                                {item.detail}
                                            </Typography>
                                        </Grid>
                                    </>
                                ))}
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <div>No blogs avalable</div>
                )}
            </Grid>
            <Link to="/">
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    <ArrowBackRoundedIcon />
                    All posts
                </Button>
            </Link>
        </>
    );
};

export default BlogDetails;
