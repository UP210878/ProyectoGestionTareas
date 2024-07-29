import {React,useState,useEffect} from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';


const getUsername = async (assignedUser) => {
  const response = await fetch(`http://localhost:8080/api/auth/getUsername/${assignedUser}`, {
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
    <div>
      <Typography variant="body1">{activity.activityName}</Typography>
      <Typography variant="body2">{username}</Typography>
      <FormControlLabel 
        control={<Checkbox checked={activity.completed} />} 
        label="Completed" 
      />
    </div>
  );
};

export default Activity;
