// Format cooking time in hours and minutes
export const formatTime = (cookTimeInMinutes) => {
  if (cookTimeInMinutes >= 60) {
    // If the cooking time is 60 minutes or more
    const hours = Math.floor(cookTimeInMinutes / 60);
    const minutes = cookTimeInMinutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
  } else {
    // If the cooking time is less than 60 minutes
    return `${cookTimeInMinutes} minute${cookTimeInMinutes > 1 ? 's' : ''}`;
  }
};
