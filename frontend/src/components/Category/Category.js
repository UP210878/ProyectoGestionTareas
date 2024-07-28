import React, { useState, useEffect } from 'react';
import { Button, TextField, Card, CardContent, Grid, Typography, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import {Delete,AddCircle} from '@mui/icons-material';
import { Task, TaskForm} from '../Task';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletePrompt, setdeletePrompt] =useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryNameToDelete,setCategoryNameToDelete] =useState('');

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
      body: JSON.stringify({ categoryName: newCategoryName }),
    });

    if (response.ok) {
      console.log("success");
      const newCategory = await response.json();
      setCategories([...categories, newCategory]); 
      setDialogOpen(false); 
      setNewCategoryName('');
    } else {
      console.log("failed to created category");
    }
  };

  const deleteCategory = async () => {
    const response = await fetch(`http://localhost:8080/api/category/deleteCategory/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Category Deleted");
      setCategories(categories.filter(category => category.categoryId !== categoryId));
      closeDeletePrompt();
    } else {
      console.log("Failed to delete category");
    }
  }

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleCategoryNameChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const openDeletePrompt = (categoryId,categoryName) => {
    setCategoryId(categoryId);
    setCategoryNameToDelete(categoryName);
    setdeletePrompt(true);
  };

  const closeDeletePrompt = () => {
    setdeletePrompt(false);
  };

  const deleteCategorySubmit = (e) => {
    e.preventDefault();
    deleteCategory();
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addCategory();
  };

  return (
    <div>
  <Grid container spacing={3} margin={1}>
    {categories.map(category => (
      <Grid item key={category.categoryId}>
        <Card>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs>
                <Typography variant='h5'>{category.categoryName}</Typography>
              </Grid>
              <Grid item>
                <IconButton onClick={() => openDeletePrompt(category.categoryId, category.categoryName)} color="error">
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
            {category.tasks.map(task => (
              <Task key={task.taskId} task={task} />
            ))}
            <TaskForm/>
          </CardContent>
        </Card>
      </Grid>
    ))}
    <Grid item margin={2}>
      <Button onClick={handleOpenDialog} variant="contained" color="primary"><AddCircle sx={{margin:1}}/> Add Category</Button>
    </Grid>
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
            <Button onClick={handleCloseDialog} color="error">Cancel</Button>
            <Button type="submit" color="primary">Add</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={deletePrompt} onClose={closeDeletePrompt}>
        <DialogTitle>Delete Category {categoryNameToDelete}</DialogTitle>
        <form onSubmit={deleteCategorySubmit}>
          <DialogActions>
            <Button onClick={closeDeletePrompt} color="error">Cancel</Button>
            <Button type="submit" color="secondary">Delete Category</Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>
  );
};

export default Category;
