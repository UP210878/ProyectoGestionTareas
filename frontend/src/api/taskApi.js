import { API_URL } from "./config";

const switchStatus = async (boolValue,taskId) => {
    const response = await fetch(`${API_URL}/tasks/updateStatus/${taskId}`, {
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

const taskApi = {
    switchStatus,
};

export default taskApi;