import { useState, useEffect } from "react";
import axios from "axios";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Articles from "./Articles";

const Topics = () => {

    const [topics, setTopics] = useState([]);
    const [key, setKey] = useState('home');

    useEffect(() => {
        axios.get("https://news-that-matters.onrender.com/api/topics/")
            .then(response => {
                return response.data.topics
            })
            .then(topics => {
                setTopics(topics)

            })
            .catch(error => {
                console.error("There was an error fetching the articles!", error);
            });
    }, []);

    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    {key === "home" && <Articles />}
                </Tab>
            </Tabs>
        </div>


    );
};

export default Topics;