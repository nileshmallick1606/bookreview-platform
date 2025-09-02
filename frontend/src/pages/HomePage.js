import React from 'react';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to BookReview Platform</h1>
      <p>Discover, review, and keep track of your favorite books.</p>
      <section className="featured-books">
        <h2>Featured Books</h2>
        <p>Loading featured books...</p>
      </section>
    </div>
  );
};

export default HomePage;
