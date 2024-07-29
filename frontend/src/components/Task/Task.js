import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Grid } from '@mui/material';
import Activity from '../Activity';
import DeleteTaskForm from './DeleteTask';

const Task = ({ task, setCategories, categories, categoryId }) => {
  const formatDueDate = (dueDate) => {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedDueDate = task.dueDate ? "Due Date: " + formatDueDate(task.dueDate) : 'No due date';

  return (
    <Card style={{ marginTop: '10px' }}>
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
          </Grid>
        </Grid>
        {task.activities.map(activity => (
          <Activity key={activity.activityId} activity={activity} />
        ))}
        <FormControlLabel 
          control={<Checkbox checked={task.completed} />} 
          label="Complete" 
        />
      </CardContent>
    </Card>
  );
};

export default Task;
