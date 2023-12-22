export const projectsContainer = document.querySelector('.projects')
export const pageContent = document.querySelector('#content')
export let currentNavElement = null

export function formatTimestamp(timestamp) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Extract the components of the date (day, month, year)
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is 0-indexed, so we add 1
  const year = date.getFullYear(); // Use full year

  // Create a formatted string
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function differenceInDays(date1, date2) {
  // Parse the dates
  const parsedDate1 = new Date(date1);
  const parsedDate2 = new Date(date2);

  // Calculate the difference in time (in milliseconds)
  const timeDiff = parsedDate2.getTime() - parsedDate1.getTime()

  // Convert the time difference from milliseconds to days
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  console.log(`Difference in days between ${date1} and ${date2}: ${diffDays}`);
  console.log(diffDays <= 7)

  return diffDays;
}

export function clearForm(form) {
  form.reset();
}