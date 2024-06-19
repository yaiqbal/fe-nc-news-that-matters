
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import { fetchArticleById, fetchCommentsForArticle, updateArticleVotes, postNewComment } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const ArticleView = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("")
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


    const handleVote = (vote) => {
        const newVotes = article.votes + vote;
        setArticle({ ...article, votes: newVotes });
        updateArticleVotes(articleId, vote)
            .catch(err => {
                setArticle({ ...article, inc_votes: article.votes });
                console.error("Error updating votes");
            });
    }

    const handleComment = (event) => {
        setNewComment(event.target.value);
    }

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const newCommentObj = {username: "tickle122", body : newComment}
        setComments([newCommentObj, ...comments])
        setNewComment('');
        postNewComment(articleId, newCommentObj)
            .catch(err => {
                setComments(comments);
                console.error("Error updating votes");
            });
    }


    return (
        <div>
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <h4>Votes: {article.votes}</h4>
            <Button onClick={() => handleVote(1)}>
                <FontAwesomeIcon icon={faThumbsUp} /> Upvote
            </Button>
            <Button onClick={() => handleVote(-1)}>
                <FontAwesomeIcon icon={faThumbsDown} /> Downvote
            </Button>
            <h4 align="left"><b>Comments:</b></h4>
            <Form onSubmit={handleCommentSubmit}>
                <InputGroup>
                    <Form.Control required as="textarea" onChange={handleComment} value={newComment} placeholder="Your comment here..." />
                    <Button type="submit">Submit comment</Button>
                </InputGroup>
            </Form>
            {
                <ListGroup>
                    {comments.map((comment, idx) => {
                        return <ListGroup.Item key={idx}>{comment.body}</ListGroup.Item>
                    })}
                </ListGroup>
            }
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );
};

export default ArticleView;
