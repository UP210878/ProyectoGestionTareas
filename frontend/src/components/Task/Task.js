import React from 'react';
import './Task.css';

class Task extends React.Component {
  render() {
    return (
      <div className="task">
        <h3>Task Title</h3>
        <div className="activity">
          <input type="checkbox" id="activity1" />
          <label htmlFor="activity1">Activity 1</label>
        </div>
        <div className="activity">
          <input type="checkbox" id="activity2" />
          <label htmlFor="activity2">Activity 2</label>
        </div>
        <button className="edit-btn">Edit</button>
        <div className="complete-toggle">
          <label>Complete</label>
          <input type="checkbox" />
        </div>
      </div>
    );
  }
}
export default Task;