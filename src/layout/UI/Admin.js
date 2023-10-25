import {
    Button,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as blogActions from "../../blogs/actions/BlogActions";
import CreateBlog from "./CreateBlog";
import { message } from "antd";
import { Search, Add, Edit, Delete } from "@material-ui/icons";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles((theme) => ({
    page: {
        width: "100%",
    },

    adminPage: {
        backgroundColor: "#fff",
        borderRadius: "0.5em",
        padding: "1em",
    },
    pageNav: {
        borderRight: "1px solid #e0e0e0",
        padding: "1em",
    },
    pageContent: {
        paddingTop: "1em",
    },
    blogList: {
        paddingTop: "1em",
    },
    blog: {
        display: "flex",
        padding: "1em",
        border: "1px solid #e0e0e0",
        borderRadius: "0.5em",
        marginBottom: "1em",
    },
    blog__image: {
        width: "120px",
        height: "120px",
    },
    blog__content: {
        padding: "0 1em",
        textAlign: "left",
    },
    button: {
        width: "80px",
        height: "30px",
        margin: "0.5em",
    },
    search: {
        display: "flex",
        alignItems: "center",
    },
    search__button: {
        padding: "0 1em",
        width: "80px",
    },
    approved: {
        color: "green",
    },
    notApproved: {
        color: "red",
    },
}));

const Blog = (props) => {
    const classes = useStyles();
    const blog = props.blog;
    const dispatch = useDispatch();

    const handleUpdateBlogClick = () => {
        dispatch(blogActions.getBlogById(blog.id));
        props.setBlog(blog);
        props.setIndex(2);
    };

    const handleApproveBlogClick = () => {
        const msg = message.loading("Updating blog!", 0);
        dispatch(blogActions.approveBlog(blog.id));
        setTimeout(msg, 1);
    };

    const handleDeleteClick = () => {
        const msg = message.loading("Deleting blog!", 0);
        dispatch(blogActions.deleteBlog(blog.id));
        setTimeout(msg, 1);
    };

    return (
        <>
            <Grid item xs={12} className={classes.blog}>
                <Grid item xs={3} className={classes.blog__image}>
                    <img src={blog.image} alt="" />
                </Grid>
                <Grid item xs={7} className={classes.blog__content}>
                    <Typography variant="h6">{blog.title}</Typography>
                    <Typography variant="body1">{blog.summary}</Typography>
                    <Typography variant="body2">{blog.publicDate}</Typography>
                    <Typography variant="body2">{blog.categories}</Typography>
                    <Typography
                        variant="body2"
                        className={
                            blog.approved
                                ? classes.approved
                                : classes.notApproved
                        }
                    >
                        {blog.approved ? "Approved" : "Not Approved"}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleUpdateBlogClick}
                    >
                        <Edit />
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleDeleteClick}
                    >
                        <Delete />
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.button}
                        onClick={handleApproveBlogClick}
                        disabled={blog.approved}
                        style={
                            !blog.approved
                                ? { backgroundColor: "#2e7d32", color: "#fff" }
                                : {}
                        }
                    >
                        Approve
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

const Page = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const blogs = props.blogs;

    const [index, setIndex] = useState(0);
    const [search, setSearch] = useState("");
    const [approved, setApproved] = useState(null);
    const [all, setAll] = useState(true);
    const [blog, setBlog] = useState({});

    useEffect(() => {
        setIndex(index);
    }, [index]);

    const handleSearchClick = () => {
        dispatch(blogActions.getBlogByFilter(search, approved));
        setIndex(0);
    };

    const handleAddBlogClick = () => {
        setIndex(1);
    };

    const handleApprovedCheckboxChange = () => {
        setAll(false);
        setApproved(true);
    };

    const handleNotApprovedCheckboxChange = () => {
        setAll(false);
        setApproved(false);
    };

    const handleAllCheckboxChange = () => {
        setAll(true);
        setApproved("");
    };

    useEffect(() => {
        dispatch(blogActions.getBlogByFilter(search, approved));
    }, [approved]);

    return (
        <div className={classes.page}>
            <Grid item className={classes.adminPage}>
                <Grid item xs={12} className={classes.title}>
                    <Typography variant="h4" style={{ marginBottom: "1em" }}>
                        Admin Page
                    </Typography>
                </Grid>
                {index === 0 ? (
                    <>
                        <Grid item container xs={12} className={classes.search}>
                            <Grid
                                item
                                xs={10}
                                className={classes.search__input}
                            >
                                <TextField
                                    id="outlined-basic"
                                    label="Search"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "100%" }}
                                    placeholder="Search blog by title"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                className={classes.search__button}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "100%" }}
                                    onClick={handleSearchClick}
                                >
                                    <Search />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            container
                            xs={12}
                            className={classes.pageContent}
                        >
                            <Grid item xs={3} className={classes.pageTool}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ width: "100%" }}
                                    onClick={handleAddBlogClick}
                                >
                                    <Add />
                                </Button>
                            </Grid>
                            <Grid
                                item
                                xs={9}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingLeft: "1em",
                                }}
                            >
                                <Checkbox
                                    checked={approved && !all}
                                    onChange={handleApprovedCheckboxChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <Typography variant="body2">Approve</Typography>
                                <Checkbox
                                    checked={!approved && !all}
                                    onChange={handleNotApprovedCheckboxChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <Typography variant="body2">
                                    Not Approve
                                </Typography>
                                <Checkbox
                                    checked={all}
                                    onChange={handleAllCheckboxChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <Typography variant="body2">All</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.blogList}>
                                {blogs && blogs.length > 0 && index === 0
                                    ? blogs.map((item, index) => (
                                          <Blog
                                              blog={item}
                                              setIndex={setIndex}
                                              setBlog={setBlog}
                                          />
                                      ))
                                    : ""}
                            </Grid>
                        </Grid>
                    </>
                ) : (
                    <CreateBlog index={index} setIndex={setIndex} blog={blog} />
                )}
            </Grid>
        </div>
    );
};

const Admin = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);
    const [limit, setLimit] = useState(5);
    const [offset, setOffset] = useState(0);
    useEffect(() => {
        dispatch(blogActions.getBlogs(limit, offset));
    }, [limit]);

    return (
        <>
            {blogs && <Page blogs={blogs} />}
            {blogs && blogs.length >= limit && (
                <Button variant="outlined" onClick={() => setLimit(limit + 5)}>
                    Load more
                </Button>
            )}
        </>
    );
};

export default Admin;
