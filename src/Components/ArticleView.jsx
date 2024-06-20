
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { fetchArticleById, fetchCommentsForArticle, updateArticleVotes, postNewComment, fetchUsers, deleteComment } from "../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArticleView.css';
import Comments from './Comments'

const ArticleView = () => {
    const { articleId } = useParams();
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("")
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState("User")
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
                return fetchUsers();
            })
            .then(fetchedUsers => {
                setUsers(fetchedUsers)
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

        if(selectedUser !== "User") {
            event.preventDefault();
            const displayCommentObj = { author: selectedUser, body: newComment }
            const postNewCommentObj = { username: selectedUser, body: newComment }
            setComments([displayCommentObj, ...comments])
            setNewComment('');
            postNewComment(articleId, postNewCommentObj)
                .then(() => {
                    alert("New comment posted");
                    // the below fetch is done since the new comment will not have a comment_id while doing optimistic rendering,
                    // and that is since comment_id is generated at BE.
                    // if this fetch is not done the newly added comment cannot be deleted until the page is refreshed and 
                    // the fetching happens again
                    return fetchCommentsForArticle(articleId)  
                })
                .then((comments) => {
                    setComments(comments)
                })
                .catch(err => {
                    setComments(comments);
                    console.error("Error updating comment");
                });
        } else {
            event.preventDefault();
            alert("Please select user prior to posting comment");
        }
    }

    const handleSelectedUser = (user) => {
        setSelectedUser(user);
    }

    const handleDeleteComment = (idx, commentId, commentAuthor) => {
        if (commentAuthor === selectedUser) {
            const updatedComments = comments.filter((comment, index) => index !== idx);
            setComments(updatedComments);
            deleteComment(commentId)
            .then(responseStatus => {
                alert("Comment deleted successfully")
            })
            .catch(err => {
                setComments(comments);
                console.error("Error deleting comment");
            });
        } else {
            alert("Can only delete comments posted by you");
        }
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

            <div className="user-dropdown">
            <p><b>Logged in as</b></p>
            <DropdownButton id="dropdown-basic-button" title={selectedUser} >
                {users.map((user) => {
                    return <Dropdown.Item key={user.username} onClick={ () => handleSelectedUser(user.username)}>{user.username}</Dropdown.Item>
                })}
            </DropdownButton>
            </div>

            <h4 align="left"><b>Comments:</b></h4>
            <Form onSubmit={handleCommentSubmit}>
                <InputGroup>
                    <Form.Control required as="textarea" onChange={handleComment} value={newComment} placeholder="Your comment here..." />
                    <Button type="submit">Submit comment</Button>
                </InputGroup>
            </Form>

            <Comments comments={comments} selectedUser={selectedUser} handleDeleteComment={handleDeleteComment}/>
            <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
        </div>
    );
};

export default ArticleView;
