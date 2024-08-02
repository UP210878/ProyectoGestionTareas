import React, {useContext, useEffect, useState} from 'react';
import { ModeContext } from '../Common';
import { CssBaseline, ThemeProvider, createTheme, Grid, Paper, Typography, FormControlLabel, Checkbox  } from '@mui/material';
import activityApi from '../../api/activityApi';

const MyActivities = () =>{
  const [username, setUsername] = useState("");
  const [completed, setCompleted] = useState(true);
  const [userId, setUserId] = useState(null);
  const [activities, setActivities] = useState([]);
  const { isDarkMode } = useContext(ModeContext);

  const getUsername = async (userId) => {
    const response = await fetch(`http://localhost:8080/api/auth/getUsername/${userId}`, {
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



    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
    
        const fetchUserId = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/auth/validateToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ token })
            });
            const textResponse = await response.text();
            if (response.ok) {
              const jsonResponse = JSON.parse(textResponse);
              setUserId(jsonResponse.userId);
            } else {
              console.error('Invalid token');
            }
          } catch (error) {
            console.error('Error validating token:', error);
          }
        };
    
        fetchUserId();
      }, []);

      useEffect(() => {
        if (userId !== null) {
          const fetchActivities = async () => {
            try {
              const response = await fetch(`http://localhost:8080/api/activities/getActivitiesByUser/${userId}`);
              const textResponse = await response.text();
              if (response.ok) {
                const jsonResponse = JSON.parse(textResponse);
                setActivities(jsonResponse);
              } else {
                console.error('User does not exist');
              }
            } catch (error) {
              console.error('Error fetching categories:', error);
            }
          };
          fetchActivities();
        }
      }, [userId]);
    
    const currentTheme = createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      });

      useEffect(() => {
        const fetchUsername = async () => {
            if (userId !== null) {
                const fetchedUsername = await getUsername(userId);
                setUsername(fetchedUsername);
            }
        };
        fetchUsername();
    }, [userId]);
    
    const updateStatus = async (currentValue, activityId) => {
      try {
        await activityApi.switchComplete(currentValue, activityId);
        setActivities(prevActivities =>
          prevActivities.map(activity =>
            activity.activityId === activityId ? { ...activity, completed: !currentValue } : activity
          )
        );
      } catch (error) {
        console.error("Error updating")
      }
    }

return(
    <ThemeProvider theme={currentTheme}>
        <CssBaseline/>
          <Grid container spacing={3} sx={{ margin: '0 auto', width: '100%', overflowX: 'hidden' }}>
          {activities.map(activity => (
          <Grid item sx xs={3}>
        <Paper elevation={5} sx={{padding:2}} key={activity.activityId}>
        <Typography variant="body1">{activity.activityName}</Typography>
        <FormControlLabel 
          control={<Checkbox checked={activity.completed} />}
          onClick={()=>{updateStatus(activity.completed,activity.activityId)}} 
          label="Completed" 
          />
      </Paper>

          </Grid>
    ))}
    </Grid>
    </ThemeProvider>
)
}; 

export default MyActivities;