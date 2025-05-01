export const dateHandler = (date) => {
  const today = new Date();
  const postDate = new Date(date);
  const timeDiff = today - postDate; // Difference in milliseconds
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)); // Convert to days
  const minDiff = Math.floor(timeDiff / (1000 * 60)); // Convert to minutes
  const secDiff = Math.floor(timeDiff / 1000); // Convert to seconds
  const hourDiff = Math.floor(timeDiff / (1000 * 60 * 60)); // Convert to hours
  const monthDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30)); // Convert to months
  const yearDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365)); // Convert to years
  if (daysDiff === 0) {
    if (hourDiff === 0) {
      if (minDiff === 0) {
        return `${secDiff} seconds ago`;
      } else {
        return `${minDiff} minutes ago`;
      }
    } else {
      return `${hourDiff} hours ago`;
    }
  }
  if (daysDiff === 1) {
    return "Yesterday";
  } else if (daysDiff < 30) {
    return `${daysDiff} days ago`;
  } else if (daysDiff < 365) {
    return `${monthDiff} months ago`;
  } else {
    return `${yearDiff} years ago`;
  }
  // return `${daysDiff} days ago`;
};