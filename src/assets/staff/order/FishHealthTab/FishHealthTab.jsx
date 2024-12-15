import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FishHealthTab.module.css';

const FishHealthTab = () => {
  const [fishHealthData, setFishHealthData] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    axios.get('https://localhost:7046/api/FishHealth/GetAllFishHealth')
      .then(response => {
        setFishHealthData(response.data.result);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleEditClick = (id, fishData) => {
    setIsEditing(id);
    setEditedData(fishData);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      axios.delete(`https://localhost:7046/api/FishHealth/DeleteFishHealthBy${id}`)
        .then(() => {
          setFishHealthData(fishHealthData.filter(item => item.id !== id));
        })
        .catch(error => console.error("Error deleting data:", error));
    }
  };

  const handleUpdateClick = () => {
    if (window.confirm('Are you sure you want to update this entry?')) {
      axios.put('https://localhost:7046/api/FishHealth/UpdateFishHealth', editedData)
        .then(() => {
          setFishHealthData(fishHealthData.map(item => item.id === editedData.id ? editedData : item));
          setIsEditing(null);
        })
        .catch(error => console.error("Error updating data:", error));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Fish Health Data</h2>
      <table className="fish-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Health Status</th>
            <th>Check Date</th>
            <th>Notes</th>
            <th>Temperature</th>
            <th>Water Quality</th>
            <th>Behavior</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fishHealthData.map(fish => (
            <tr key={fish.id}>
              <td>{fish.id}</td>
              <td>
                {isEditing === fish.id ? (
                  <input
                    type="text"
                    name="healthStatus"
                    value={editedData.healthStatus}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : fish.healthStatus}
              </td>
              <td>
                {isEditing === fish.id ? (
                  <input
                    type="datetime-local"
                    name="checkDate"
                    value={editedData.checkDate}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : new Date(fish.checkDate).toLocaleString()}
              </td>
              <td>
                {isEditing === fish.id ? (
                  <input
                    type="text"
                    name="notes"
                    value={editedData.notes}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : fish.notes}
              </td>
              <td>
                {isEditing === fish.id ? (
                  <input
                    type="number"
                    name="temperature"
                    value={editedData.temperature}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : fish.temperature}
              </td>
              <td>
                {isEditing === fish.id ? (
                  <input
                    type="number"
                    name="waterQuality"
                    value={editedData.waterQuality}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : fish.waterQuality}
              </td>
              <td>
                {isEditing === fish.id ? (
                  <input
                    type="text"
                    name="behavior"
                    value={editedData.behavior}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                ) : fish.behavior}
              </td>
              <td>
                {isEditing === fish.id ? (
                  <div className="button-container">
                    <button onClick={handleUpdateClick} className="save-button">Save</button>
                    <button onClick={() => setIsEditing(null)} className="cancel-button">Cancel</button>
                  </div>
                ) : (
                  <div className="button-container">
                    <button onClick={() => handleEditClick(fish.id, fish)} className="edit-button">Edit</button>
                    <button onClick={() => handleDeleteClick(fish.id)} className="delete-button">Delete</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FishHealthTab;
