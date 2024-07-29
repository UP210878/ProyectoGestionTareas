import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

const TaskForm = ({categoryId,setCategories,categories}) => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [dueDate,setDueDate] = useState('');

  const handleTaskFormSubmit = (event) => {
    event.preventDefault();
    addTask();
  };

  const addTask = async () => {
    const response = await fetch(`http://localhost:8080/api/tasks/postTask/${categoryId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ taskName,dueDate }),
    });

    if (response.ok) {
      const newTask = await response.json();
      console.log("success");
      setCategories(categories.map(category => 
        category.categoryId === categoryId 
        ? { ...category, tasks: [...category.tasks, newTask] } 
        : category
      ));
      setOpen(false); 
    } else {
      console.log("Failed to created Task");
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
  }

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
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
        <Button variant="outlined" onClick={() => { /* Add activity logic */ }}>Add Activity</Button>
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