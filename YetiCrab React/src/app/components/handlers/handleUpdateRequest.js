export const handleUpdateRequest = (index, event, requests, setRequests, setEditingRequest, status) => {
  event.preventDefault();

  const updatedRequest = {
    number: event.target.number.value,
    date: event.target.date.value,
    name: event.target.name.value,
    fullName: event.target.fullName.value,
    tel: event.target.tel.value,
    comment: event.target.comment.value,
    status: status,
    ATI: event.target.ATI.value,
  };
  const updatedRequests = [...requests];
  updatedRequests[index] = updatedRequest;
  setRequests(updatedRequests);
  setEditingRequest(null);
};

