import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

const TaskForm = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          />
          <Typography marginTop={2}>Activities</Typography>
          <TextField
            required
            margin="dense"
            id="activityName"
            name="activityName"
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="assignedUser"
            name="assignedUser"
            label="Assigned User"
            fullWidth
            variant="standard"
          />
          
        <Button variant="outlined" onClick={() => { /* Add activity logic */ }}>Add Activity</Button>
        <Typography>Due date</Typography>
        <TextField
            required
            margin="dense"
            id="dueDate"
            name="dueDate"
            fullWidth
            variant="standard"
            type='date'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button type="submit">Add Task</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default TaskForm;