const calculateTotalTime = (prepTime, cookTime) => {
  // Function to convert various formats to consistent format: "X hours Y minutes"
  const convertToHoursAndMinutes = (input) => {
    if (typeof input === "number") {
      // If input is a number, assume it's in minutes
      const hours = Math.floor(input / 60);
      const minutes = input % 60;
      return `${hours} hours ${minutes} minutes`;
    } else if (typeof input === "string") {
      // If input is a string, try to extract hours and minutes using regex
      const match = input.match(/(\d+)\s*hour(?:s)?\s*(\d*)\s*minute(?:s)?/i);
      if (match) {
        const hours = parseInt(match[1], 10) || 0;
        const minutes = parseInt(match[2], 10) || 0;
        return `${hours} hours ${minutes} minutes`;
      }
    }
    // If input cannot be parsed, return a default value
    return "0 hours 0 minutes";
  };

  // Convert prepTime and cookTime to consistent format
  const formattedPrepTime = convertToHoursAndMinutes(prepTime);
  const formattedCookTime = convertToHoursAndMinutes(cookTime);

  // Extract hours and minutes from the formatted times
  const [prepHours, prepMinutes] = formattedPrepTime
    .match(/(\d+)\s*hour(?:s)?\s*(\d*)\s*minute(?:s)?/)
    .slice(1)
    .map((part) => parseInt(part, 10));
  const [cookHours, cookMinutes] = formattedCookTime
    .match(/(\d+)\s*hour(?:s)?\s*(\d*)\s*minute(?:s)?/)
    .slice(1)
    .map((part) => parseInt(part, 10));

  // Calculate total hours and total minutes
  const totalHours = prepHours + cookHours;
  const totalMinutes = prepMinutes + cookMinutes;

  // Convert totalMinutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Create a formatted total time string
  const totalTime = `${totalHours + hours} hours ${minutes} minutes`;

  return totalTime;
};

export default calculateTotalTime;
