import React, { useState, useEffect } from 'react';
import ErrorMessage from '../../handling-errors/ErrorMessage'; 

const TagError = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch(`/api/recipes?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTags(data.tags);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load tags: ' + err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorMessage message={error} /> 
      ) : (
        <div>
          <h1>Recipe Title</h1>
          <ul>
            {tags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagError;
