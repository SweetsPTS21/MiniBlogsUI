import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { TextareaAutosize } from "@mui/base";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import * as blogActions from "../blogs/actions/BlogActions";
import { useDispatch } from "react-redux";
import { message as antdMessage } from "antd";

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
    formControl: {
        minWidth: 120,
        margin: 0,
        padding: "0.5em 0",
    },
    title: {
        marginBottom: "0.5em",
    },
    button: {
        backgroundColor: "#888888",
        width: "120px",
        margin: "1em 0",
        "&:hover": {
            backgroundColor: "#aeaeae",
        },
    },
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
}));

const Contact = () => {
    const classes = userStyle();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async () => {
        const msg = antdMessage.loading("Sending message", 0);
        dispatch(blogActions.sendContact({ email, name, message }));
        setTimeout(msg, 1);
        setEmail("");
        setName("");
        setMessage("");
    };

    return (
        <>
            <Grid item xs={12} className={classes.aboutPage}>
                <Grid item xs={12} className={classes.about}>
                    <Grid item xs={12} className={classes.about__content}>
                        <Typography variant="h4" className={classes.title}>
                            Get in touch
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
                        <Typography variant="paragraph">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed euismod eu lorem et ultricies. In porta
                            lorem at dui semper porttitor.
                        </Typography>
                    </Grid>
                    <ValidatorForm onSubmit={handleSubmit}>
                        <FormGroup className={classes.about__content}>
                            <FormControl
                                fullWidth
                                className={classes.formControl}
                            >
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    Name
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="Your name"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "100%" }}
                                    validators={["required"]}
                                    errorMessages={["Enter your name"]}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                className={classes.formControl}
                            >
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    Email Address
                                </Typography>
                                <TextValidator
                                    type="text"
                                    placeholder="Email"
                                    variant="outlined"
                                    size="small"
                                    style={{ width: "100%" }}
                                    validators={["required"]}
                                    errorMessages={["Enter email address"]}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                            <FormControl
                                fullWidth
                                className={classes.formControl}
                            >
                                <Typography
                                    variant="h6"
                                    className={classes.title}
                                >
                                    Message
                                </Typography>
                                <TextField
                                    multiline
                                    minRows={5}
                                    variant="outlined"
                                    placeholder="Your message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                className={classes.button}
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

export default Contact;
