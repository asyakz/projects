export const handleRemoveRequest = (index, setRequests, requests) => {
  const updatedRequests = [...requests];
  updatedRequests.splice(index, 1);
  setRequests(updatedRequests);
};