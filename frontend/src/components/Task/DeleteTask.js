import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Button } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

const DeleteTaskForm = ({taskId,setCategories,categories,categoryId}) => {
  const [open, setOpen] = useState(false);

  const deleteTaskSubmit = (event) => {
    event.preventDefault();
    deleteTask();
  };

  const deleteTask = async () => {
    const response = await fetch(`http://143.198.244.40:8080/api/tasks/deleteTask/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log("Task Deleted");
      setCategories(categories.map(category => 
        category.categoryId === categoryId 
          ? { ...category, tasks: category.tasks.filter(task => task.taskId !== taskId) }
          : category
      ));
      setOpen(false); 
    } else {
      console.log("Failed to delete Task");
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton color='error' variant="outlined" onClick={handleClickOpen}>
        <DeleteOutline/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <form onSubmit={deleteTaskSubmit}>
        <DialogContent>
          <DialogContentText>
            Delete a task and all its activities.
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
          <Button type="submit" color='primary'>Delete Task</Button>
        </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteTaskForm;