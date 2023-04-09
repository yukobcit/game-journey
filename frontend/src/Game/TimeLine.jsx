import React, { useState, useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth, API } from "aws-amplify";
import '../styles/TimeLine.css'

const PAGE_SIZE = 10; // number of items to display per page

const TimelineJornal = () => {
    const [jornals, setJornals] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await API.get("api", "/jornals");
          setJornals(response.jornals);
          console.log(response.jornals);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  
    const handleJournalClick = (user, game) => {
      const filteredJornals = jornals.filter(
        (jornal) => jornal.user === user && jornal.game_id === game
      );
      setJornals(filteredJornals);
      setSelectedUser(user);
      setSelectedGame(game);
      if (filteredJornals.length < PAGE_SIZE) {
        setCurrentPage(1);
      }
    };
  
    const totalPages = Math.ceil(
      selectedUser ? jornals.filter((jornal) => jornal.user === selectedUser).length : jornals.length / PAGE_SIZE
    );
  
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentItems = selectedUser
      ? jornals.filter((jornal) => jornal.user === selectedUser).slice(startIndex, endIndex)
      : jornals.slice(startIndex, endIndex);
  
    const handlePageChange = (page) => setCurrentPage(page);
    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);
    const clearFilters = async () => {
        try {
          const response = await API.get("api", "/jornals");
          setJornals(response.jornals);
          setSelectedUser(null);
          setSelectedGame(null);
          setCurrentPage(1);
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div className="timeline-journal">
        {selectedUser !== "" || selectedGame !== "" ? (
        <button className="clear-filter-button" onClick={clearFilters}>
            Clear Filter
        </button>
        ) : null}
            
        {currentItems.map((journal) => (
          <div
            className="timeline-journal__card"
            key={journal.id}
            onClick={() => handleJournalClick(journal.user, journal.game_id)}
          >
            <div className="timeline-journal__content">
              <p className="timeline-journal__game-name">{journal.game_name}</p>
              <p className="timeline-journal__text">{journal.jornal}</p>
              <p className="timeline-journal__date">
                {new Date(journal.played_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination__button"
              disabled={currentPage === 1}
              onClick={handlePrevPage}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`pagination__button ${
                  index + 1 === currentPage ? "pagination__button--active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="pagination__button"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
};


export default TimelineJornal;
