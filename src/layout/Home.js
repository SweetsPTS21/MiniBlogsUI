import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Error from "../components/Error";
import { useDispatch, useSelector } from "react-redux";
import * as blogActions from "../blogs/actions/BlogActions";
import { format } from "date-fns";

const userStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#e9e9e9",
    },
    main: {
        margin: "0 auto",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        padding: "1em",
    },
    block: {
        backgroundColor: "#fff",
        borderRadius: 5,
        // boxShadow: "0 0 5px #ccc",
        margin: "10px 0",
    },
    listBlog: {
        display: "flex",
        padding: "1em 0 1em 1.5em",
    },
    blog: {
        display: "flex",
        backgroundColor: "#fff",
        borderRadius: "0.5em",
        // boxShadow: "0 0 5px #ccc",
        marginBottom: "1.5em",
        padding: "1em",
        maxHeight: "260px",
    },
    blog__image: {
        padding: "0.5em",
        cursor: "pointer",
        width: "100%",
        height: "100%",
    },
    date: {
        color: "#888888",
    },
    category: {
        color: "#888888",
        padding: "0 0.5em",
        borderLeft: "3px solid #ccc",
        margin: "0.5em",
    },
    blog__date: {
        padding: "0.5em 0",
    },
    blog__content: {
        padding: "0.5em",
        textAlign: "left",
    },
    blogImg: {
        borderRadius: "0.5em",
    },
    blog__title: {
        fontWeight: "bold",
        fontSize: "1.5em",
    },
    blog__description: {
        fontSize: "1em",
    },
    loadmore: {
        display: "flex",
        justifyContent: "flex-start",
    },
    button: {
        height: "40px",
        backgroundColor: "#888888",
        margin: "1em 0",
        "&:hover": {
            backgroundColor: "#aeaeae",
        },
    },
}));

// PaginatedItems component to display paginated items
const PaginatedItems = () => {
    const classes = userStyle();
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const [limit] = useState(5);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        dispatch(blogActions.getBlogs(limit, offset));
    }, [offset, limit, dispatch]);

    return (
        <>
            <Blogs blogs={blogs} />

            {offset + limit <= blogs.length && (
                <Grid item xs={12} className={classes.loadmore}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => setOffset(offset + limit)}
                    >
                        More posts
                        <ArrowForwardRoundedIcon />
                    </Button>
                </Grid>
            )}
            {offset > 0 && (
                <Grid item xs={12} className={classes.loadmore}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => setOffset(offset - limit)}
                    >
                        Back
                        <ArrowBackRoundedIcon />
                    </Button>
                </Grid>
            )}
        </>
    );
};

// Blogs component to display blogs
const Blogs = ({ blogs }) => {
    const classes = userStyle();

    const convertDate = (date) => {
        return format(new Date(date), "yyyy-MM-dd");
    };
    
    return (
        <>
            {blogs ? (
                blogs.map((item, index) => (
                    <Grid item container className={classes.blog} key={index}>
                        <Grid item xs={4} className={classes.blog__image}>
                            <Link to={`/blogs/${item.id}`}>
                                <img
                                    src={item.image}
                                    alt="Author avatar"
                                    className={classes.blogImg}
                                ></img>
                            </Link>
                        </Grid>
                        <Grid item xs={8} className={classes.blog__content}>
                            <Grid className={classes.blog__title}>
                                <Typography variant="h6">
                                    {item.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.blog__date}>
                                <Typography
                                    variant="inherit"
                                    className={classes.date}
                                >
                                    {convertDate(item.publicDate)}
                                </Typography>
                                <Typography
                                    variant="inherit"
                                    className={classes.category}
                                >
                                    {item.categories.map((category, index) => (
                                        <span key={index}>
                                            {category + " "}
                                        </span>
                                    ))}
                                </Typography>
                            </Grid>
                            <Grid className={classes.blog__description}>
                                <Typography variant="inherit">
                                    {item.summary}
                                </Typography>
                                <Link to={`/blogs/${item.id}`}>
                                    <Typography
                                        variant="inherit"
                                        className={classes.date}
                                    >
                                        {" Read more..."}
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                ))
            ) : (
                <div>No blogs avalable</div>
            )}
        </>
    );
};

const Home = () => {
    const [error] = useState("");

    return (
        <>
            {" "}
            {<PaginatedItems />}
            {error && <Error error={error} />}
        </>
    );
};

export default Home;
