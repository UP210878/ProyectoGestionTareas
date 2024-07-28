import React from 'react';
import { Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';
import Activity from '../Activity';

const Task = ({ task }) => {
  return (
    <Card style={{ marginTop: '10px' }}>
      <CardContent>
        <Typography variant="h6">{task.taskName}</Typography>
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
