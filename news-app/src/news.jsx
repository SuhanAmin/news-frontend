import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import axios from 'axios';

function News() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  axios.get(`https://newsapi.org/v2/everything?q=india&language=en&sortBy=publishedAt&apiKey=5b9b6485ee464c5cbb5d36093ff0aee1`)
    .then(res => setArticles(res.data.articles))
   .catch(err => {
  console.error("News fetch failed:", err);
  setError("Failed to load news. Please try again later.");
});

}, []);


  return (
    <>
      <header>📱 Smart News Dashboard</header>

      <section id="news-section" className="section">
        <div id="news-container">
          {error && <p className="error">{error}</p>}
          {articles.length === 0 && !error && <p>Loading news...</p>}
          {articles.map((article, index) => (
  <div key={index} className="news-article">
    {article.urlToImage && (
      <img src={article.urlToImage} alt={article.title} className="news-image" />
    )}
    <h3>{article.title}</h3>
    <p>{article.description}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      Read more
    </a>
  </div>
))}
        </div>
      </section>

      <footer>
        <button onClick={() => navigate('/home')}>Local News</button>
        <button className="active">News</button>
        <button onClick={() => navigate('/profile')}>Profile</button>
      </footer>
    </>
  );
}

export default News;
