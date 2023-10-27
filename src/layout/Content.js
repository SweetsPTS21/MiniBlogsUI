import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./Loading";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Author from "./Author";
import Error from "../components/Error";
import Admin from "./UI/Admin";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Contact = lazy(() => import("./Contact"));
const BlogDetails = lazy(() => import("./BlogDetails"));

const userStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#e9e9e9",
    },
    main: {
        maxWidth: 1000,
        minWidth: 900,
        margin: "0 auto",
    },
    container: {
        display: "flex",
        justifyContent: "center",
        padding: "1em",
    },
    author: {
        width: "100%",
        position: "relative",
        borderRadius: 5,
        // boxShadow: "0 0 5px #ccc",
        margin: "1em 0",
    },
    listBlog: {
        display: "flex",
        padding: "1em 0 1em 1.5em",
    },
}));

const Content = () => {
    const classes = userStyle();
    return (
        <div className="content">
            <div className={classes.root}>
                <div className={classes.main}>
                    <Grid container className={classes.container}>
                        <Grid item xs={3} className={classes.author}>
                            <Author />
                        </Grid>
                        <Grid
                            item
                            container
                            xs={9}
                            className={classes.listBlog}
                        >
                            <Suspense fallback={<Loading />}>
                                <Routes>
                                    <Route exact path={"/"} element={<Home />}>
                                        Home
                                    </Route>
                                    <Route
                                        exact
                                        path="/about"
                                        element={<About />}
                                    >
                                        About
                                    </Route>
                                    <Route
                                        exact
                                        path="/contact"
                                        element={<Contact />}
                                    >
                                        Contact
                                    </Route>
                                    <Route
                                        exact
                                        path="/admin"
                                        element={<Admin />}
                                    />
                                    <Route
                                        exact
                                        path="/blogs/:id"
                                        element={<BlogDetails />}
                                    />
                                    <Route
                                        path="*"
                                        element={
                                            <Error error={"Page not found"} />
                                        }
                                    />
                                </Routes>
                            </Suspense>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default Content;
