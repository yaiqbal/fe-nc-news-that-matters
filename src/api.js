import axios from "axios";

const NEWS_URL = "https://news-that-matters.onrender.com/api";

export const fetchArticles = async () => {
    const response = await axios.get(`${NEWS_URL}/articles`)
    return response.data.articles
};


export const fetchArticleById = async (articleId) => {
    const response = await axios.get(`${NEWS_URL}/articles/${articleId}`)
    return response.data.article[0]
};

export const fetchCommentsForArticle = async (articleId) => {
    const response = await axios.get(`${NEWS_URL}/articles/${articleId}/comments`)
    return response.data.comments
};

export const updateArticleVotes = async (articleId, newVotes ) => {
    const response = await axios.patch(`${NEWS_URL}/articles/${articleId}`, {inc_votes : newVotes})
    return response.data.article[0];
}

export const postNewComment = async (articleId, newComment ) => {
    const response = await axios.post(`${NEWS_URL}/articles/${articleId}/comments`, newComment)
    return response.data;
}

export const fetchTopics = async () => {
    const response = await axios.get(`${NEWS_URL}/topics`)
    return response.data.topics
};
