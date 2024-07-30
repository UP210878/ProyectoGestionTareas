import React, { useState } from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Grid, Paper, IconButton } from '@mui/material';
import Activity from '../Activity';
import DeleteTaskForm from './DeleteTask';
import ModifyTaskForm from './ModifyTaskForm';
import { Edit } from '@mui/icons-material';

const Task = ({ task, setCategories, categories, categoryId }) => {
  const [openModifyDialog, setOpenModifyDialog] = useState(false);

  const handleOpenModifyDialog = () => {
    setOpenModifyDialog(true);
  };

  const handleCloseModifyDialog = () => {
    setOpenModifyDialog(false);
  };

  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDueDate = task.dueDate ? "Due Date: " + formatDueDate(task.dueDate) : 'No due date';

  return (
    <Paper elevation={4}>
      <Card style={{ marginTop: '10px' }}>
        <Paper elevation={3}>
          <CardContent>
            <Grid container>
              <Grid item xs>
                <Typography variant="h6">{task.taskName}</Typography>
                <Typography variant="body2">{formattedDueDate}</Typography>
              </Grid>
              <Grid item>
                <DeleteTaskForm 
                  taskId={task.taskId}
                  setCategories={setCategories}
                  categories={categories}
                  categoryId={categoryId}
                />
                <IconButton color="info" onClick={handleOpenModifyDialog}>
                  <Edit />
                </IconButton>
              </Grid>
            </Grid>
            {task.activities.map(activity => (
              <Activity key={activity.activityId} activity={activity} />
            ))}
            <FormControlLabel 
              control={<Checkbox checked={task.completed} />} 
              label="Task Complete" 
            />
          </CardContent>
        </Paper>
      </Card>
      <ModifyTaskForm
        task={task}
        categoryId={categoryId}
        setCategories={setCategories}
        categories={categories}
        open={openModifyDialog}
        handleClose={handleCloseModifyDialog}
      />
    </Paper>
  );
};

export default Task;
