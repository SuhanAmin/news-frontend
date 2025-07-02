import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

function News() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = '/api/auth/news';
    fetch(url,{
      credentials:'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        return response.json();
      })
      .then(data => {
        setArticles(data.articles || []);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching news:', error);
      })
      
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
