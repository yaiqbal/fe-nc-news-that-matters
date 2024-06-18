
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Card";

const ArticleView = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://news-that-matters.onrender.com/api/articles/${articleId}`)
            .then(response => {
                setArticle(response.data.article[0]);
            })
            .catch(error => {
                console.error("Error fetching article", error);
            });
    }, [articleId]);

    if (!article) return <div>Loading...</div>;

    return (
        <div>
            
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );
};

export default ArticleView;
