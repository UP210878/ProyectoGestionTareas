import { API_URL } from "./config";

const switchComplete = async (boolValue,activityId) => {
    const response = await fetch(`${API_URL}/activities/updateStatusActivity/${activityId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boolValue),
    });

    const fullresponse = await response.text();
    if (response.ok) {
        return fullresponse;
      } else {
        throw new Error(fullresponse.message);
      }
}

const activityApi = {
    switchComplete,
};

export default activityApi;