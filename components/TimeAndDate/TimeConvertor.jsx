
export default function CookTime({ cookTimeInMinutes, label, prepTimeInMinutes }) {

  const formatTime = (minutes) => {
    
    if (minutes >= 60) {

      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;

      if (mins === 0) {

        return `${hours} hour${hours > 1 ? 's' : ''}`;

      } else if (hours === 0) {

        return `${mins} minute${mins > 1 ? 's' : ''}`;

      }else {

        return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;

      }

    }else {

      return `${minutes} minute${minutes > 1 ? 's' : ''}`;

    }

  };

  const formattedLabel = label.toLowerCase();

  const formattedTime = formattedLabel === 'total time' ? formatTime(cookTimeInMinutes + prepTimeInMinutes) : formatTime(cookTimeInMinutes);

  return(
  
    <h4>
    
      <b>{label}:</b> {formattedTime}
    
    </h4>
    
  )

};

