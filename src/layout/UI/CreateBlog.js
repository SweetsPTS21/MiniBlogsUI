import React, { useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/base";
import { message } from "antd";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import * as blogActions from "../../blogs/actions/BlogActions";
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    Typography,
    TextField,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    adminPage: {
        backgroundColor: "#fff",
        borderRadius: "0.5em",
        width: "100%",
    },
    form__control: {
        marginBottom: "1em",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        padding: "1em",
    },
    form__header: {
        display: "flex",
        //justifyContent: "flex-end",
    },
    form__add: {
        padding: "1em",
    },
    title: {
        fontWeight: 600,
        textAlign: "left",
        width: "120px",
    },
    textField: {},
    textArea: {
        fontFamily: "inherit",
        fontSize: "1rem",
        padding: "0.5em",
        fontWeight: 400,
        lineHeight: 1.5,
        border: "1px solid #ced4da",
        borderRadius: "0.3em",
        "&:focus": {
            outline: "none",
            border: "2px solid #1E7BD7",
        },
    },
    buttonBack: {
        width: "80px",
        border: "none",
    },
}));

const CreateBlog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const index = props.index;
    const currentBlog = props.blog;

    const blog = index === 2 ? currentBlog : {};
    const [title, setTitle] = useState(blog.title);
    const [summary, setSummary] = useState(blog.summary);
    const [publicDate, setPublicDate] = useState(blog.publicDate);
    const [categories, setCategories] = useState(blog.categories);
    const [source, setSource] = useState(blog.source);
    const [image, setImage] = useState(blog.image);
    const [content, setContent] = useState(blog.content ? blog.content : []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const msg = message.loading("Updating blog!", 0);
        const blogUpdate = {
            ...blog,
            title: title,
            summary: summary,
            publicDate: publicDate,
            categories: categories,
            source: source,
            image: image,
            content: content,
        };
        index === 1
            ? await dispatch(blogActions.createBlog(blogUpdate))
            : await dispatch(blogActions.updateBlog(blogUpdate));
        props.setIndex(0);
        setTimeout(msg, 1);
    };

    const handlBackClick = () => {
        props.setIndex(0);
    };

    const handleAddContent = () => {
        const newContent = {
            title: "",
            detail: "",
        };
        setContent([...content, newContent]);
    };

    const handleChangeContentTitle = (e, index) => {
        const newContent = content;
        newContent[index].title = e.target.value;
        setContent([...newContent]);
    };

    const handleChangeContentDetail = (e, index) => {
        const newContent = content;
        newContent[index].detail = e.target.value;
        setContent([...newContent]);
    };

    const handleRemoveContent = (index) => {
        const newContent = content;
        newContent.splice(index, 1);
        setContent([...newContent]);
    };

    return (
        <>
            <Grid container className={classes.form}>
                <Grid item xs={12} className={classes.form__header}>
                    <Button
                        variant="outlined"
                        className={classes.buttonBack}
                        onClick={handlBackClick}
                    >
                        <ArrowBackRoundedIcon />
                    </Button>
                    <Typography variant="h5">Create Blog</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <FormGroup className={classes.form__add}>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Title
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="Title"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["Enter blog title"]}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className={classes.textField}
                                />
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Summary
                                </Typography>
                                <TextValidator
                                    minRows={5}
                                    multiline
                                    fullWidth
                                    variant="outlined"
                                    validators={["required"]}
                                    placeholder="Your message"
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Date
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="Date"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["Enter valid date"]}
                                    value={publicDate}
                                    onChange={(e) =>
                                        setPublicDate(e.target.value)
                                    }
                                    className={classes.textField}
                                />
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Category
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="Category"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["Enter category"]}
                                    value={categories}
                                    onChange={(e) =>
                                        setCategories(e.target.value)
                                    }
                                    className={classes.textField}
                                />
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Source
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="Source"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["Enter source"]}
                                    value={source}
                                    onChange={(e) => setSource(e.target.value)}
                                    className={classes.textField}
                                />
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Image
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="image url"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    validators={["required"]}
                                    errorMessages={["Enter image url"]}
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    className={classes.textField}
                                />
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Content
                                </Typography>
                                {content &&
                                    content.map((item, index) => (
                                        <div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "flex-start",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <strong
                                                    style={{ margin: "1em 0" }}
                                                >{`Part ${index + 1}`}</strong>
                                                <Button
                                                    color="secondary"
                                                    variant="text"
                                                    size="small"
                                                    style={{
                                                        height: "30px",
                                                        fontSize: "2em",
                                                        textAlign: "center",
                                                        padding: "0",
                                                    }}
                                                    onClick={(e) =>
                                                        handleRemoveContent(
                                                            index
                                                        )
                                                    }
                                                >
                                                    -
                                                </Button>
                                            </div>
                                            <TextValidator
                                                type="text"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                label="Title"
                                                validators={["required"]}
                                                errorMessages={[
                                                    "Enter content",
                                                ]}
                                                value={item.title}
                                                onChange={(e) =>
                                                    handleChangeContentTitle(
                                                        e,
                                                        index
                                                    )
                                                }
                                                className={classes.textField}
                                                style={{ fontWeight: "bold" }}
                                            />
                                            <TextValidator
                                                id="standard-multiline-flexible"
                                                label="Content"
                                                multiline
                                                fullWidth
                                                maxRows={4}
                                                variant="outlined"
                                                validators={["required"]}
                                                style={{
                                                    marginTop: "1em",
                                                }}
                                                value={item.detail}
                                                onChange={(e) =>
                                                    handleChangeContentDetail(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    ))}
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    style={{ marginTop: "1em" }}
                                    onClick={handleAddContent}
                                >
                                    <Add />
                                </Button>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </FormGroup>
                    </ValidatorForm>
                </Grid>
            </Grid>
        </>
    );
};

export default CreateBlog;
