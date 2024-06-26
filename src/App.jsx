import './App.css'
import Header from './Components/Header'
import Topics from './Components/Topics'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from "./Components/Articles";
import ArticleView from "./Components/ArticleView";
import TopicView from './Components/TopicView';
import PageNotFound from './Components/PageNotFound';

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={[<Header key={1} />, <Topics key={2} />]} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:articleId" element={<ArticleView />} />
          <Route path="/topics/:topic" element={<TopicView key={1} />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  )

}

export default App

