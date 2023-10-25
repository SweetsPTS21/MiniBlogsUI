import axios from "axios";
import { message } from "antd";
export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOG_BY_ID = "GET_BLOG_BY_ID";
export const GET_BLOGS_BY_FILTER = "GET_BLOGS_BY_FILTER";
export const APPORVE_BLOG = "APPORVE_BLOG";

const api_url = process.env.REACT_APP_API_URL;
const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;

const base64Credentials = btoa(`${username}:${password}`);
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
    },
});

const blogLimit = process.env.REACT_APP_BLOG_LIMT;

export const createBlog = (blog) => async (dispatch) => {
    const url = `${api_url}/blogs`;

    await axiosInstance
        .post(url, blog)
        .then((response) => {
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(getBlogs(blogLimit, 0));
        })
        .catch((error) => {
            console.log(error);
            message.error("Error creating blog");
        });
};

export const getBlogs = (limit, offset) => async (dispatch) => {
    const url = `${api_url}/blogs?limit=${limit}&offset=${offset}`;

    await axiosInstance
        .get(url)
        .then((response) => {
            dispatch({
                type: "GET_BLOGS",
                blogs: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
            message.error("Error getting blogs");
        });
};

export const getBlogById = (id) => async (dispatch) => {
    const url = `${api_url}/blogs/${id}`;

    await axiosInstance
        .get(url)
        .then((response) => {
            dispatch({
                type: "GET_BLOG_BY_ID",
                blog: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
            message.error("Error getting blog");
        });
};

export const getBlogByFilter = (title, approved) => async (dispatch) => {
    let url = `${api_url}/blogs/search?key=${title}`;
    url += approved ? "&approve=true" : "";
    await axiosInstance
        .get(url)
        .then((response) => {
            dispatch({
                type: "GET_BLOGS_BY_FILTER",
                blogs: response.data,
            });
        })
        .catch((error) => {
            console.log(error);
            message.error("Error getting blogs");
        });
};

export const updateBlog = (blog) => async (dispatch) => {
    const url = `${api_url}/blogs/${blog.id}`;

    await axiosInstance
        .put(url, blog)
        .then((response) => {
            dispatch(getBlogs(blogLimit, 0));
            message.success("Blog updated");
        })
        .catch((error) => {
            console.log(error);
            message.error("Error updating blog");
        });
};

export const deleteBlog = (id) => async (dispatch) => {
    const url = `${api_url}/blogs/${id}`;

    await axiosInstance
        .delete(url)
        .then((response) => {
            dispatch(getBlogs(blogLimit, 0));
            message.success("Blog deleted");
        })
        .catch((error) => {
            console.log(error);
            message.error("Error deleting blog");
        });
};

export const approveBlog = (id) => async (dispatch) => {
    const url = `${api_url}/blogs/${id}`;

    await axiosInstance
        .patch(url)
        .then((response) => {
            dispatch({
                type: APPORVE_BLOG,
                blog: response.data,
            });
            message.success("Blog approved");
        })
        .catch((error) => {
            console.log(error);
            message.error("Error approving blog");
        });
};

export const sendContact = (contact) => async (dispatch) => {
    const url = `${api_url}/contact`;

    await axiosInstance
        .post(url, contact)
        .then((response) => {
            message.success("Contact sent");
        })
        .catch((error) => {
            console.log(error);
            message.error("Error sending contact");
        });
};
