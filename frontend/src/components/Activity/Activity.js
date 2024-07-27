import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';

const Activity = ({ activity }) => {
  return (
    <div>
      <Typography variant="body1">{activity.activityName}</Typography>
      <FormControlLabel 
        control={<Checkbox checked={activity.completed} />} 
        label="Completed" 
      />
    </div>
  );
};

export default Activity;
