
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticles, fetchTopics } from "../api";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArticleCard.css'
import Sort from './Sort'

const TopicView = () => {
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("Sort By");
    const [sortOrder, setSortOrder] = useState("Sort Order");

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetchTopics()
            .then(topics => {
                const topicSlugs = topics.map( topic => topic.slug)
                if(!topicSlugs.includes(topic)) navigate(`/PageNotFound`)
            }).catch(error => {
                console.error("Error fetching articles", error);
            });
        fetchArticles()
            .then(articles => {        
                const sortedArticles = [...articles].sort((prevElement, nextElement) => nextElement.comment_count - prevElement.comment_count);
                setArticles(sortedArticles)
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

    const handleClickSortOrder = (order) => {
        setSortOrder(order)
        handleClick(sortBy,order)
    }
    const handleClick = (sort_by, sort_order) => {
        let sortedArticles = []
        setSortBy(sort_by)
        sort_order = sort_order === undefined || sort_order === "Desc" ? "Desc" : "Asc";
        setSortOrder(sort_order)
        switch (sort_by) {
            case 'Comment count':
                if(sort_order === "Desc") { 
                    sortedArticles = [...articles].sort((prevElement, nextElement) => nextElement.comment_count - prevElement.comment_count);
                } else {
                    sortedArticles = [...articles].sort((prevElement, nextElement) => prevElement.comment_count - nextElement.comment_count);
                }
                break;
            case 'Date':
                if(sort_order === "Desc") { 
                    sortedArticles = [...articles].sort((prevElement, nextElement) => (new Date(nextElement.created_at)) - (new Date(prevElement.created_at)));
                } else {
                    sortedArticles = [...articles].sort((prevElement, nextElement) => (new Date(prevElement.created_at)) - (new Date(nextElement.created_at)));
                }
                break;
            case 'Votes':
                if(sort_order === "Desc") { 
                    sortedArticles = [...articles].sort((prevElement, nextElement) => nextElement.votes - prevElement.votes);
                } else {
                    sortedArticles = [...articles].sort((prevElement, nextElement) => prevElement.votes - nextElement.votes);
                }
                break;
            default:
                sortedArticles = [...articles].sort((prevElement, nextElement) => nextElement.comment_count - prevElement.comment_count);
        }
        setArticles(sortedArticles)
    }

    if (loading) return <div>Loading articles...</div>;

    return (
        <div>
            <h1 className="heading-with-bg">Articles on {topic}</h1>
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
            <Sort handleClick={handleClick} handleClickSortOrder={handleClickSortOrder} sortBy={sortBy} sortOrder={sortOrder} />
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
                                <Card.Text><b>Votes:</b> {article.votes}</Card.Text>
                                <Card.Text><b>Created at:</b> {Intl.DateTimeFormat('en-GB').format(new Date(article.created_at))}</Card.Text>
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
