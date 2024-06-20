import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();
    return (
    <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Button variant="primary" onClick={() => navigate('/')}>Back to Home</Button>
    </div>
    )
}

export default PageNotFound;