import { useState } from 'react'
import './App.css'
import Header from './Header'
import Topics from './Topics'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from "./Articles";
import ArticleView from "./ArticleView";

function App() {

  return (
    <Router>
    <div>
        <Routes>
            <Route path="/" element={[<Header key={1}/>, <Topics key={2} />]} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:articleId" element={<ArticleView />} /> 
        </Routes>
    </div>
</Router>
  )

}

export default App

