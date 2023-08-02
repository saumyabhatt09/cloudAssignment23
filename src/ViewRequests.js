import React, { useEffect, useState } from 'react';


function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const userId = "saumyab"; // Replace this with the actual userId you want to send

  useEffect(() => {
    fetch('https://37go0l0zf8.execute-api.us-east-1.amazonaws.com/bookbridge/viewrequests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.parse(data.body);
        console.log(data);
        setRequests(parsedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

const handleAcceptClick = (request) => {
  // Get the borrowerUserId from localStorage
  const borrowerUserId = "sb123";

  // Extract data from the request object
  const { bookId, title, userId } = request;
  console.log(request);
  // Data to send to the API
  const requestData = {
    borrowerUserId,
    bookId,
    title,
    userId,
    status: 'Taken', // Set the status to "Taken"
    request: 'Accepted', // Set the request status to "Accepted"
  };

  // Make a POST request to your backend API
  fetch('https://37go0l0zf8.execute-api.us-east-1.amazonaws.com/bookbridge/requesthandler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData), // Convert data to JSON format and send it in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // If the response is successful, update the state or perform any other actions as needed.
      console.log('Request accepted:', requestData);
      alert("Request Accepted");
    })
    .catch((error) => {
      console.error('Error accepting request:', error);
      // Handle errors here
    });
};

const handleRejectClick = (request) => {
  // Get the borrowerUserId from localStorage
  const borrowerUserId = "sb123";

  // Extract data from the request object
  const { bookId, title, userId } = request;
  console.log(request);
  // Data to send to the API
  const requestData = {
    borrowerUserId,
    bookId,
    title,
    userId,
    status: 'Available', // Set the status to "Taken"
    request: 'Rejected', // Set the request status to "Accepted"
  };

  // Make a POST request to your backend API
  fetch('https://37go0l0zf8.execute-api.us-east-1.amazonaws.com/bookbridge/requesthandler', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData), // Convert data to JSON format and send it in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // If the response is successful, update the state or perform any other actions as needed.
      console.log('Request accepted:', requestData);
      alert("Request Accepted");
    })
    .catch((error) => {
      console.error('Error accepting request:', error);
      // Handle errors here
    });
};

  return (
    <div>
      <h1>View Requests</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.bookId}>
            <strong>Title:</strong> {request.title}
            <br />
            <strong>Author:</strong> {request.author}
            <br />
            <button onClick={() => handleAcceptClick(request)}>Accept</button>
            <button onClick={() => handleRejectClick(request.bookId)}>Reject</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewRequests;
