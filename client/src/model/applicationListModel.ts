import {handleError} from '../util/error_handler';

/**
 * Function used for loading all user applications from the server.
 * @return The json-object from the server-response, containing all found applications.
 * @async
 * */
async function applicationListModel() {
  const host: string =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
  const url: string = '' + host + '/user/all';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    if (!response.ok) {
      handleError({response});
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error('Fetch operation failed:', error);
    throw new Error('Failed to load applications');
  }
}
export default applicationListModel;
