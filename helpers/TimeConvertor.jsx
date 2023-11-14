// CookTime component displays the cooking time and optionally preparation time for a recipe
export default function Time({ cookTimeInMinutes, label, prepTimeInMinutes }) {
  // Function to format time in hours and minutes
  const formatTime = (minutes) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (mins === 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      } else if (hours === 0) {
        return `${mins} minute${mins > 1 ? "s" : ""}`;
      } else {
        return `${hours} hour${hours > 1 ? "s" : ""} ${mins} minute${
          mins > 1 ? "s" : ""
        }`;
      }
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  };

  // Convert the label to lowercase for consistent formatting
  const formattedLabel = label.toLowerCase();

  // Calculate the formatted time, considering preparation time if provided
  const formattedTime =
    formattedLabel === "total time"
      ? formatTime(cookTimeInMinutes + prepTimeInMinutes)
      : formatTime(cookTimeInMinutes);

  return (
    <p>
      <aside className='flex flex-col'>
        {label} : {formattedTime}
      </aside>
    </p>
  );
}
