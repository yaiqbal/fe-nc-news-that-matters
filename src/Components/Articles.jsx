import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Card";
import { Routes, Route, Link, useNavigate  } from "react-router-dom";
import './ArticleCard.css'
import { fetchArticles } from "../api"; 


const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

        useEffect(() => {
            setLoading(true)
            fetchArticles()
            .then(articles => {
                setArticles(articles)
            })
            .catch(error => {
                console.error("Error fetching articles", error);
            })
            .finally(() => {
                setLoading(false); 
            });
        }, []);

        if (loading) return <div>Loading articles...</div>;

        const handleButtonClick = (article_id) => {
            navigate(`/articles/${article_id}`);
        }

        return (
            <div>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {articles.map((article, idx) => (
                        <Col key={idx}>
                            <Card className="article-card">
                                <Card.Img variant="top" src={article.article_img_url} className="card-img" />
                                <Card.Body>
                                    <Card.Text><b>Title:</b>{article.title}</Card.Text>
                                    <Card.Text><b>Author:</b> {article.author}</Card.Text>
                                    <Card.Text><b>Category:</b> {article.topic}</Card.Text>
                                    <Card.Text><b>Comments:</b> {article.comment_count}</Card.Text>
                                    <Button variant="primary" onClick={ () => handleButtonClick(article.article_id)}>Read Article & Comments</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
};

export default Articles;