const getDaysFromDate = (date: string): number => {
  const currentDate = new Date();
  const to = new Date(date);
  const msDifference = currentDate.getTime() - to.getTime();
  const days = Math.ceil(msDifference / (1000 * 60 * 60 * 24));
  return days;
};

export default getDaysFromDate;
