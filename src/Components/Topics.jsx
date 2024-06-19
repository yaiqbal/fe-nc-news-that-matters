import { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Articles from "./Articles";
import { fetchTopics } from "../api"; 

const Topics = () => {

    const [topics, setTopics] = useState([]);
    const [key, setKey] = useState('home');

    useEffect(() => {
        fetchTopics()
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