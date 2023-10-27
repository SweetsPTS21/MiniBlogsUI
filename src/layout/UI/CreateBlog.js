import React, { useState } from "react";
import { message } from "antd";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import * as blogActions from "../../blogs/actions/BlogActions";
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/FirebaseConfig";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

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

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CategorySelect = (props) => {
    const categoryList = [
        "Technology",
        "Business",
        "Health",
        "Sport",
        "Movie",
        "Enterainment",
        "Education",
        "Other",
    ];
    const ITEM_HEIGHT = 42;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                textAlign: "left",
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const handleChangeCategory = (event) => {
        const {
            target: { value },
        } = event;
        props.setCategories(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={props.categories}
            onChange={handleChangeCategory}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                </Box>
            )}
            MenuProps={MenuProps}
        >
            {categoryList.map((item) => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    );
};

const Content = (props) => {
    const classes = useStyles();
    const content = props.content;

    const handleAddContent = () => {
        const newContent = {
            title: "",
            detail: "",
        };
        props.setContent([...content, newContent]);
    };

    const handleChangeContentTitle = (e, index) => {
        const newContent = content;
        newContent[index].title = e.target.value;
        props.setContent([...newContent]);
    };

    const handleChangeContentDetail = (e, index) => {
        const newContent = content;
        newContent[index].detail = e.target.value;
        props.setContent([...newContent]);
    };

    const handleRemoveContent = (index) => {
        const newContent = content;
        newContent.splice(index, 1);
        props.setContent([...newContent]);
    };

    return (
        <>
            {content &&
                content.map((item, index) => (
                    <div key={index}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <strong style={{ margin: "1em 0" }}>{`Part ${
                                index + 1
                            }`}</strong>
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
                                onClick={(e) => handleRemoveContent(index)}
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
                            inputProps={{ maxLength: 100 }}
                            errorMessages={["Enter title (max 100 characters)"]}
                            value={item.title}
                            onChange={(e) => handleChangeContentTitle(e, index)}
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
                            inputProps={{ maxLength: 250 }}
                            errorMessages={[
                                "Enter detail (max 250 characters)",
                            ]}
                            style={{
                                marginTop: "1em",
                            }}
                            value={item.detail}
                            onChange={(e) =>
                                handleChangeContentDetail(e, index)
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
        </>
    );
};


const CreateBlog = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const index = props.index;
    const currentBlog = props.blog;

    const blog = index === 2 ? currentBlog : {};
    const [title, setTitle] = useState(blog.title);
    const [summary, setSummary] = useState(blog.summary);
    const [publicDate, setPublicDate] = useState(blog.publicDate);
    const [categories, setCategories] = useState(
        blog.categories ? blog.categories : []
    );
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


    const handleFilechange = async (e) => {
        e.preventDefault();
        const msg = message.loading("Uploading image!", 0);

        const file = e.target.files[0];
        const storageRef = ref(storage, `images/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            message.success("File uploaded successfully");

            const url = await getDownloadURL(snapshot.ref);
            setImage(url);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setTimeout(msg, 1);
        }
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
                    <Typography variant="h5">Create/Update Blog</Typography>
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
                                    errorMessages={[
                                        "Enter blog title (max 100 characters)",
                                    ]}
                                    inputProps={{ maxLength: 100 }}
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
                                    inputProps={{ maxLength: 250 }}
                                    errorMessages={[
                                        "Enter summary (max 250 characters)",
                                    ]}
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
                                    inputProps={{ maxLength: 20 }}
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
                                <CategorySelect
                                    categories={categories}
                                    setCategories={setCategories}
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
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUploadIcon />}
                                    style={{ marginTop: "1em" }}
                                >
                                    Upload file
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(e) => handleFilechange(e)}
                                    />
                                </Button>
                            </FormControl>
                            <FormControl className={classes.form__control}>
                                <Typography className={classes.title}>
                                    Content
                                </Typography>
                                <Content
                                    content={content}
                                    setContent={setContent}
                                />
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
