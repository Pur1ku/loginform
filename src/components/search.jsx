import React, { useState } from 'react';
import './Search.css'; // เพิ่มการอ้างอิงไฟล์ CSS

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    // เรียก API จาก JSONPlaceholder เพื่อค้นหาโพสต์
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const data = await response.json();

    // กรองข้อมูลให้ตรงกับคำค้นหา
    const filteredResults = data.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredResults);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาโพสต์..."
          className="search-input"
        />
        <button type="submit" className="search-button">ค้นหา</button>
      </form>
      <div className="search-results">
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="result-item">
              <h3 className="result-title">{result.title}</h3>
              <p className="result-body">{result.body}</p>
            </div>
          ))
        ) : (
          <p className="no-results">ไม่มีผลลัพธ์</p>
        )}
      </div>
    </div>
  );
};

export default Search;