import React, { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Task from '../Task';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newCategoryName, setCategoryName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const addCategory = async () => {
    const response = await fetch(`http://localhost:8080/api/category/postCategory/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ categoryName: newCategoryName }), // Updated to send as an object
    });

    if (response.ok) {
      console.log("success");
      const newCategory = await response.json();
      setCategories([...categories, newCategory]); // Update the categories state with the new category
      setDialogOpen(false); 
      setCategoryName('');
    } else {
      console.log("failure");
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addCategory();
  };

  return (
    <div>
      <Button onClick={handleOpenDialog} variant="contained" color="primary">Add Category</Button>

      <Grid container spacing={2}>
        {categories.map(category => (
          <Grid item key={category.categoryId}>
            <Card>
              <CardContent>
                <Typography>{category.categoryName}</Typography>
                {category.tasks.map(task => (
                  <Task key={task.taskId} task={task} />
                ))}
                <Button variant="outlined" onClick={() => { /* Add task logic */ }}>Add Task</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Category</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              value={newCategoryName}
              onChange={handleCategoryNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
            <Button type="submit" color="primary">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default Category;
