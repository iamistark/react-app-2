import React, { useState } from 'react';

function GitHubUserFinder() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
      } else {
        setUserData(null);
        alert(data.message || 'User not found');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>GitHub User Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={handleChange}
          placeholder="Enter a GitHub username"
        />
        <button type="submit">Search</button>
      </form>
      {userData && (
        <div>
          <img src={userData.avatar_url} alt="Avatar" />
          <p>Name: {userData.name}</p>
        </div>
      )}
    </div>
  );
}

export default GitHubUserFinder;
