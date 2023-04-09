import React, { useState } from 'react';
import '../styles/JornalRecord.css';

function JornalRecord({ jornal, played_at, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [updatedJornal, setUpdatedJornal] = useState(jornal);
  console.log("jornal: ", jornal);

  function handleEditClick() {
    setEditing(true);
  }

  function handleSaveClick() {
    onUpdate(jornal.id, updatedJornal);
    setEditing(false);
  }

  function handleCancelClick() {
    setEditing(false);
    setUpdatedJornal(jornal);
  }

  function handleDeleteClick() {
    onDelete(jornal.id);
  }

  return (
    <div className="journal-card">
    {editing ? (
        <div class="journal-card__form">
        <textarea 
            value={updatedJornal.jornal} 
            onChange={(e) => setUpdatedJornal(e.target.value)} 
        />
        <div className="journal-card__actions">
            <button className="btn btn--primary" onClick={handleSaveClick}>Save</button>
            <button className="btn btn--secondary" onClick={handleCancelClick}>Cancel</button>
        </div>
        </div>
    ) : (
        <div className="journal-card__content">
        <p className="journal-card__text">{jornal.jornal}</p>
        <p className="journal-card__date">{new Date(jornal.played_at).toLocaleString()}</p>
        <div className="journal-card__actions">
            <button className="btn btn--primary" onClick={handleEditClick}>Edit</button>
            <button className="btn btn--secondary" onClick={handleDeleteClick}>Delete</button>
        </div>
        </div>
    )}
    </div>

  );
}

export default JornalRecord;