import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, IconButton, Typography } from '@mui/material';
import { Delete } from "@mui/icons-material";

const TaskForm = ({ categoryId, setCategories, categories }) => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [activities, setActivities] = useState([]);

  const handleTaskFormSubmit = async (event) => {
    event.preventDefault();
    addTask();
  };

  const addTask = async () => {
    const response = await fetch(`http://localhost:8080/api/tasks/postTask/${categoryId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName, dueDate, activities }),
    });

    if (response.ok) {
      const newTask = await response.json();
      setCategories(categories.map(category => 
        category.categoryId === categoryId 
        ? { ...category, tasks: [...category.tasks, newTask] } 
        : category
      ));
      setOpen(false);
      setTaskName('');
      setDueDate('');
      setActivities([]);
    } else {
      console.log("Failed to create Task");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Task</DialogTitle>
        <form onSubmit={handleTaskFormSubmit}>
          <DialogContent>
            <DialogContentText>
              Add a task and all its activities using this form.
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
                <Grid item xs>
                  <TextField
                    margin="dense"
                    label={`Activity ${index + 1}`}
                    fullWidth
                    variant="standard"
                    value={activity.activityName}
                    onChange={(e) => handleActivityChange(index, e.target.value)}
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
            <Button type="submit">Add Task</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default TaskForm;
