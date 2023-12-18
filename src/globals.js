export const projectsContainer = document.querySelector('.projects')
export const pageContent = document.querySelector('#content')
export let currentNavElement = null

export function formatTimestamp(timestamp) {
    // Create a new Date object using the timestamp
    const date = new Date(timestamp);
  
    // Extract the components of the date (day, month, year)
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is 0-indexed, so we add 1
    const year = date.getFullYear().toString().slice(-2);
  
    // Create a formatted string
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }