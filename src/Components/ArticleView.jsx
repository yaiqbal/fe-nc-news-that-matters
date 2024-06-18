
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Card";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchArticleById , fetchCommentsForArticle} from "../api"; 

const ArticleView = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    

    useEffect(() => {
        setLoading(true);
        fetchArticleById(articleId)
            .then(article => {
                setArticle(article);
                return fetchCommentsForArticle(articleId);
            })
            .then(comments => {
                setComments(comments);
            })
            .catch(error => {
                console.error("Error fetching article", error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [articleId]);


    if (loading) return <div>Loading article and comments...</div>;

    return (
        <div>

            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <h4 align="left"><b>Comments:</b></h4>
            {
                <ListGroup>
                {comments.map((comment, idx) => {

                   return  <ListGroup.Item key={idx}>{comment.body}</ListGroup.Item>

        
                })}
                </ListGroup>
            }
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );
};

export default ArticleView;
