import {
    GET_BLOGS,
    GET_BLOG_BY_ID,
    GET_BLOGS_BY_FILTER,
    APPORVE_BLOG,
} from "../actions/BlogActions";

const intialState = {
    blogs: [],
    blog: {},
    approveBlog: {},
};

const BlogReducer = (state = intialState, action) => {
    switch (action.type) {
        case GET_BLOGS:
            return {
                ...state,
                blogs: action.blogs,
            };
        case GET_BLOG_BY_ID:
            return {
                ...state,
                blog: action.blog,
            };
        case GET_BLOGS_BY_FILTER:
            return {
                ...state,
                blogs: action.blogs,
            };
        case APPORVE_BLOG:
            return {
                ...state,
                approveBlog: action.blog,
            };
        default:
            return state;
    }
};

export default BlogReducer;
