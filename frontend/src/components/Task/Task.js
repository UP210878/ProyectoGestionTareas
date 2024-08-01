import React, {useState} from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel, Grid, Paper } from '@mui/material';
import Activity from '../Activity';
import DeleteTaskForm from './DeleteTask';
import ModifyTaskForm from './ModifyTaskForm';
import taskApi from '../../api/taskApi';

const Task = ({ task, setCategories, categories, categoryId }) => {
  const [completed, setCompleted] = useState(task.completed);

  const updateStatus = (currentValue, taskId) => {
    try {
      taskApi.switchStatus(currentValue,taskId);
      setCompleted(!currentValue);
    } catch (error) {
      console.error("Error updating task status, error: ", error)
    }
  }

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
                <ModifyTaskForm
                  task={task}
                  categoryId={categoryId}
                  setCategories={setCategories}
                  categories={categories}
                />
              </Grid>
            </Grid>
            {task.activities.map(activity => (
              <Activity key={activity.activityId} activity={activity} />
            ))}
            <FormControlLabel 
              control={<Checkbox checked={completed} />} 
              onClick={()=>{updateStatus(completed,task.taskId)}} 
              label="Task Complete" 
            />
          </CardContent>
        </Paper>
      </Card>
    </Paper>
  );
};

export default Task;
