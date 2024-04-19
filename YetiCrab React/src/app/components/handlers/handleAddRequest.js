export const handleAddRequest = (event, setRequests, requests, nanoid, dateNow) => {
  event.preventDefault();
  const newRequest = {
    number: nanoid(),
    date: dateNow(),
    name: event.target.name.value,
    fullName: event.target.fullName.value,
    tel: event.target.tel.value,
    comment: event.target.comment.value,
    status: 'Новая',
    ATI: event.target.ATI.value,
  };
  if (
    event.target.fullName.value !== '' &&
    event.target.tel.value !== '' &&
    event.target.comment.value !== '' &&
    event.target.ATI.value !== ''
  ) {
    setRequests([...requests, newRequest]);
    event.target.name.value = '';
    event.target.fullName.value = '';
    event.target.tel.value = '';
    event.target.comment.value = '';
    event.target.ATI.value = '';
  }
};