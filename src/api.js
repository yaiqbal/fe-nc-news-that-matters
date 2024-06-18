import axios from "axios";

export const fetchArticles = () => {
    return axios.get("https://news-that-matters.onrender.com/api/articles/")
        .then(response => response.data.articles)
        .catch(error => {
            console.error("Error fetching articles", error);
        });
};


export const fetchArticleById = (articleId) => {
    return axios.get(`https://news-that-matters.onrender.com/api/articles/${articleId}`)
        .then(response => response.data.article[0])
        .catch(error => {
            console.error("Error fetching article", error);
        });
};

export const fetchCommentsForArticle = (articleId) => {
    return axios.get(`https://news-that-matters.onrender.com/api/articles/${articleId}/comments`)
        .then(response => response.data.comments)
        .catch(error => {
            console.error("Error fetching comments", error);
        });
};

export const fetchTopics = () => {
    return axios.get("https://news-that-matters.onrender.com/api/topics/")
        .then(response => response.data.topics)
        .catch(error => {
            console.error("Error fetching topics", error);
        });
};
