import { useState, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Articles from "./Articles";
import { fetchTopics } from "../api"; 
import { useNavigate  } from "react-router-dom";

const Topics = () => {

    const [topics, setTopics] = useState([]);
    const [key, setKey] = useState('home');
    const navigate = useNavigate();

    useEffect(() => {
        fetchTopics()
            .then(topics => {
                setTopics(topics)
            })
            .catch(error => {
                console.error("There was an error fetching topics!", error);
            });
    }, []);


    const handleSelect = (topic) => {
        navigate(`/topics/${topic}`)
    }
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => {
                    setKey(k)
                    handleSelect(k)
                    }
                }
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    {key === "home" && <Articles />}
                </Tab>
                {topics.map(topic => {
                    return (<Tab key={topic.slug} onSelect={() => handleSelect(topic.slug)}eventKey={topic.slug} title={topic.slug}>{topic.slug}</Tab>)
                })}
            </Tabs>
        </div>


    );
};

export default Topics;