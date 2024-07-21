import React from 'react';
import './Category.css';
import Task from '../Task/Task';

class Category extends React.Component {
  
  render() {
    return (
      <div className="category">
        <h2>Category 1</h2>
        <button className="add-task-btn">Add Task</button>
        <Task />
        <Task />
      </div>
    );
  }
}

export default Category;