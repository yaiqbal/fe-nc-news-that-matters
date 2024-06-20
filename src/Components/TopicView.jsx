
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticles } from "../api";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArticleCard.css'

const TopicView = () => {
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

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

    const handleButtonClick = (article_id) => {
        navigate(`/articles/${article_id}`);
    }

    if (loading) return <div>Loading articles...</div>;

    return (
        <div>
            <h1 className="heading-with-bg">Articles on {topic}</h1>
            <Row xs={1} md={2} lg={4} className="g-4">
                {articles.filter(article => article.topic === topic).map((article, idx) => {
                    return (
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
                    );
                })}
            </Row>
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );

};

export default TopicView;
