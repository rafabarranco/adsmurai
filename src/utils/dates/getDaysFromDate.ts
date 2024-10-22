const getDaysFromDate = (date: string): number => {
  const to = new Date(date);

  if (isNaN(to.getTime())) {
    throw new Error('Invalid date string');
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  const msDifference = currentDate.getTime() - to.getTime();
  const days = Math.floor(msDifference / (1000 * 60 * 60 * 24));

  return days < 0 ? 0 : days;
};

export default getDaysFromDate;
