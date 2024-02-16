export const addThirtyMinutes: (timeStr: string) => string = (
  timeStr: string
): string => {
  // Convert 12-hour format to 24-hour format for easier manipulation
  let [hoursStr, rawMinutes] = timeStr.split(':');
  const minutes = Number(rawMinutes.split(' ')[0]); // This will split "15 pm" into ["15", "pm"] and take the first element.
  const isPM = timeStr.includes('pm');

  let hours = Number(hoursStr); // Convert the hours string to a number

  if (isPM && hours !== 12) hours += 12; // Adjust hours for PM
  if (!isPM && hours === 12) hours = 0; // Adjust for 12:00 AM

  // Add 30 minutes
  let newMinutes = minutes + 30;
  if (newMinutes >= 60) {
    newMinutes -= 60;
    hours += 1;
  }

  // Convert back to 12-hour format
  let newTimePeriod = 'am';
  if (hours >= 12) {
    newTimePeriod = 'pm';
    if (hours > 12) hours -= 12;
  }

  // Format and return
  return `${hours}:${newMinutes.toString().padStart(2, '0')} ${newTimePeriod}`;
};

export const formatUSTimezone = (timezone: string): string => {
  const timezoneOffsets: { [key: string]: string } = {
    'America/New_York': '(UTC -05:00) Eastern Time',
    'America/Chicago': '(UTC -06:00) Central Time',
    'America/Denver': '(UTC -07:00) Mountain Time',
    'America/Phoenix': '(UTC -07:00) Arizona Time',
    'America/Los_Angeles': '(UTC -08:00) Pacific Time',
    'America/Anchorage': '(UTC -09:00) Alaska Time',
    'America/Adak': '(UTC -10:00) Hawaii-Aleutian Time',
    'Pacific/Honolulu': '(UTC -10:00) Hawaii Standard Time',
    'America/Samoa': '(UTC -11:00) Samoa Standard Time',
    'Pacific/Guam': '(UTC +10:00) Chamorro Standard Time',
  };

  return timezoneOffsets[timezone] || 'Unknown Timezone';
};
