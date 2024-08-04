import {React,useState,useEffect} from 'react';
import { FormControlLabel, Checkbox, Typography, Paper } from '@mui/material';
import activityApi from '../../api/activityApi';


const getUsername = async (assignedUser) => {
  const response = await fetch(`http://143.198.244.40:8080/api/auth/getUsername/${assignedUser}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, 
  });

  if (response.ok) {
    const username = await response.text();
    return username;
  } else {
    console.log("Error fetching user");
  }
};


const Activity = ({ activity }) => {
  const [username, setUsername] = useState("");
  const [completed, setCompleted] = useState(activity.completed);

  const updateStatus = async (currentValue, activityId) => {
    try {
      activityApi.switchComplete(currentValue,activityId);
      setCompleted(!currentValue);
    } catch (error) {
      console.error("Error updating")
    }
  }

  useEffect(() => {
    const fetchUsername = async () => {
        if (activity.assignedUser) {
            const fetchedUsername = await getUsername(activity.assignedUser);
            setUsername("Responsible: " + fetchedUsername);
        }
    };
    fetchUsername();
}, [activity.assignedUser]);

  return (
    <Paper elevation={5} sx={{margin:1, padding:1}}>
      <Typography variant="body1">{activity.activityName}</Typography>
      <Typography variant="body2">{username}</Typography>
      <FormControlLabel 
        control={<Checkbox checked={completed} />}
        onClick={()=>{updateStatus(completed,activity.activityId)}} 
        label="Completed" 
        />
    </Paper>
  );
};

export default Activity;
