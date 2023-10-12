
export const formatTime =(cookTimeInMinutes)=> {
  
    if (cookTimeInMinutes >= 60) {
      const hours = Math.floor(cookTimeInMinutes / 60);
      const minutes = cookTimeInMinutes % 60;
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return `${cookTimeInMinutes} minute${cookTimeInMinutes > 1 ? 's' : ''}`;
    }
  }


