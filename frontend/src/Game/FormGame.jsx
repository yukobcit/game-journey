import React, { useState } from 'react';
import '../styles/FormGame.css'

const FormGame = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [console, setConsole] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, company, console, description, releaseDate);
  };

  return (
    <div className='form'>
      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          Company
          <input
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </label>
        <label>
          Console
          <input
            type="text"
            value={console}
            onChange={(event) => setConsole(event.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Release Date
          <input
            type="text"
            value={releaseDate}
            onChange={(event) => setReleaseDate(event.target.value)}
          />
        </label>
        <button onClick={handleSubmit} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormGame;
