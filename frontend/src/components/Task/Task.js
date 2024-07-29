import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel , Grid } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material'
import Activity from '../Activity';
import DeleteTaskForm from './DeleteTask';

const Task = ({ task, setCategories, categories, categoryId }) => {
  return (
    <Card style={{ marginTop: '10px' }}>
      <CardContent>
        <Grid container>
        <Grid item xs>
        <Typography variant="h6">{task.taskName}</Typography>
        </Grid>
        <Grid item>
        <DeleteTaskForm 
        taskId={task.taskId}
        setCategories={setCategories}
        categories={categories}
        categoryId={categoryId}/>
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
