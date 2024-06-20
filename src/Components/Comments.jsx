import Button from "react-bootstrap/Button";
import ListGroup from 'react-bootstrap/ListGroup';

const Comments = ({comments,selectedUser,handleDeleteComment}) => {

    return (
        <ListGroup>
        {comments.map((comment, idx) => {
            const isCommentAuthor = comment.author === selectedUser;
            return <ListGroup.Item align="left" key={idx}>
                <b>{comment.author}</b> : {comment.body}
                <Button disabled={!isCommentAuthor} variant="danger" size="sm" onClick={ () => handleDeleteComment(idx, comment.comment_id, comment.author )}>Delete</Button>
            </ListGroup.Item>
        })}
        </ListGroup>
    )
}

export default Comments;