export const capitalizeString = str => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
export const defaultAccount = {
  id: '',
  accountName: '',
  complementaryHours: 0,
  timePaidInHours: 0,
  coursePrice: 0,
  entries: [],
};
export const defaultEntry = {
  id: '',
  date: new Date(),
  endOfCycle: false,
  isDoubleLesson: false,
  paidOnDate: false,
  colorBar: {key: '#ff9aa2', label: 'None'},
  notes: [],
};
export const optionContainerStyle = {backgroundColor: '#FFDAC1'};
export const optionTextStyle = {color: 'black', fontWeight: 'bold'};
export const cancelStyle = {backgroundColor: '#FFB3BA'};
export const cancelTextStyle = {color: 'black', fontWeight: 'bold'};
