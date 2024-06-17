import { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import './ArticleCard.css'

const Articles = () => {

    const [articles, setArticles] = useState([]);
        useEffect(() => {
            axios.get("https://news-that-matters.onrender.com/api/articles/")
            .then(response => {
                return response.data.articles
            })
            .then(articles => {
                setArticles(articles)
            })
            .catch(error => {
                console.error("Error fetching articles", error);
            });
        }, []);

        return (
            <div>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {articles.map((article, idx) => (
                        <Col key={idx}>
                            <Card className="article-card">
                                <Card.Img variant="top" src={article.article_img_url} className="card-img" />
                                <Card.Body>
                                    <Card.Text><b>Title:</b> {article.title}</Card.Text>
                                    <Card.Text><b>Author:</b> {article.author}</Card.Text>
                                    <Card.Text><b>Category:</b> {article.topic}</Card.Text>
                                    <Card.Text><b>Comments:</b> {article.comment_count}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        );
};

export default Articles;