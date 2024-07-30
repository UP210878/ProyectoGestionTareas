import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton, Typography, Autocomplete } from '@mui/material';
import { Delete } from "@mui/icons-material";

const ModifyTaskForm = ({ task, categoryId, setCategories, categories, open, handleClose }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [activities, setActivities] = useState(task.activities);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    getUsernames();
  }, []);

  const getUsernames = async () => {
    const response = await fetch(`http://localhost:8080/api/auth/getUsernames`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      const usernames = await response.json();
      setUsernames(usernames);
    } else {
      console.log("Failed to get users")
    }
  };

  const handleAssignedUserChange = async (index, username) => {
    if (username !== null) {
      const response = await fetch(`http://localhost:8080/api/auth/getUserIdByUsername/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const value = await response.json();
        const newActivities = activities.map((activity, i) =>
          i === index ? { ...activity, assignedUser: value } : activity
        );
        setActivities(newActivities);
      } else {
        console.log("Error in getUserIdByUsername");
      }
    }
  };

  const modifyTask = async () => {
    const response = await fetch(`http://localhost:8080/api/tasks/updateTask/${task.taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName, dueDate, activities }),
    });

    if (response.ok) {
      const updatedTask = await response.json();
      setCategories(categories.map(category =>
        category.categoryId === categoryId
          ? {
            ...category,
            tasks: category.tasks.map(t =>
              t.taskId === task.taskId ? updatedTask : t
            )
          }
          : category
      ));
      handleClose();
    } else {
      console.log("Failed to update Task");
    }
  };

  const handleTaskFormSubmit = (event) => {
    event.preventDefault();
    modifyTask();
  };

  const handleTaskNameChange = (e) => {
    setTaskName(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const addActivityField = () => {
    setActivities([...activities, { activityName: '' }]);
  };

  const handleActivityChange = (index, value) => {
    const newActivities = activities.map((activity, i) =>
      i === index ? { ...activity, activityName: value } : activity
    );
    setActivities(newActivities);
  };

  const handleDeleteActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Modify Task</DialogTitle>
      <form onSubmit={handleTaskFormSubmit}>
        <DialogContent>
          <DialogContentText>
            Modify the task and its activities using this form.
          </DialogContentText>
          <Typography marginTop={2}>Task Name</Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            id="taskName"
            name="taskName"
            label="Task Name"
            fullWidth
            variant="standard"
            value={taskName}
            onChange={handleTaskNameChange}
          />
          <Typography marginTop={2}>Activities</Typography>
          {activities.map((activity, index) => (
            <Grid container key={index} spacing={1} alignItems="center">
              <Grid item xs marginTop={1}>
                <TextField
                  margin="dense"
                  label={`Activity ${index + 1}`}
                  fullWidth
                  variant="standard"
                  value={activity.activityName}
                  onChange={(e) => handleActivityChange(index, e.target.value)}
                />
                <Autocomplete
                  margin="dense"
                  fullWidth
                  options={usernames}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField {...params} label={`Responsible for Activity ${index + 1}`} variant="standard" />
                  )}
                  onChange={(e, value) => handleAssignedUserChange(index, value)}
                />
              </Grid>
              <Grid item>
                <IconButton
                  color='error'
                  onClick={() => handleDeleteActivity(index)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" onClick={addActivityField}>Add Activity</Button>
          <Typography>Due date</Typography>
          <TextField
            margin="dense"
            id="dueDate"
            name="dueDate"
            fullWidth
            variant="standard"
            value={dueDate}
            onChange={handleDueDateChange}
            type='date'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button type="submit">Modify Task</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ModifyTaskForm;
