import React, { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, Grid } from '@mui/material';
import Task from '../Task';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/auth/validateToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        });
        const textResponse = await response.text();
        if (response.ok) {
          const jsonResponse = JSON.parse(textResponse);
          setUserId(jsonResponse.userId);
        } else {
          console.error('Invalid token');
        }
      } catch (error) {
        console.error('Error validating token:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchCategories = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/category/getCategoryByUserId/${userId}`);
          const textResponse = await response.text();
          if (response.ok) {
            const jsonResponse = JSON.parse(textResponse);
            setCategories(jsonResponse);
          } else {
            console.error('User does not exist');
          }
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
      fetchCategories();
    }
  }, [userId]);

  const addCategory = () => {
    const newCategory = { id: Date.now(), name: '', tasks: [] };
    setCategories([...categories, newCategory]);
  };

  const handleCategoryChange = (id, name) => {
    setCategories(categories.map(cat => (cat.id === id ? { ...cat, name } : cat)));
  };

  return (
    <div>
      <Button onClick={addCategory} variant="contained" color="primary">Add Category</Button>
      <Grid container spacing={2}>
        {categories.map(category => (
          <Grid item key={category.categoryId}>
            <Card>
              <CardContent>
                <TextField
                  value={category.categoryName}
                  onChange={(e) => handleCategoryChange(category.categoryId, e.target.value)}
                  placeholder="Category Name"
                />
                {category.tasks.map(task => (
                  <Task key={task.taskId} task={task} />
                ))}
                <Button variant="outlined" onClick={() => { /* Add task logic */ }}>Add Task</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Category;
