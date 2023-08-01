import React, { useEffect, useState } from 'react';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  console.log('https://jbjmc1ph3k.execute-api.us-east-1.amazonaws.com/prod/viewbooks');
  useEffect(() => {
    fetch('${process.env.REACT_APP_API_ENDPOINT}/viewbooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBooks(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleBorrowClick = (bookId) => {
    const borrowData = {
      title: books.find((book) => book.bookId === bookId).title,
      borrowerUserId: 'sb123', // Replace with the user ID of the borrower
      type: 'Borrow', // You can customize this based on your use case
      userId: books.find((book) => book.bookId === bookId).userId,
    };

    fetch('https://jbjmc1ph3k.execute-api.us-east-1.amazonaws.com/prod/placequeue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(borrowData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Message sent to SQS:', data);
        alert(data.message);
      })
      .catch((error) => {
        console.error('Error sending message to SQS:', error);
        // Add error handling here
      });
    console.log(`Borrow button clicked for bookId: ${bookId}`);
  };

  const handleLeaseClick = (bookId) => {
   const borrowData = {
     title: books.find((book) => book.bookId === bookId).title,
     borrowerUserId: 'sb123',
     userId: 'saumyab', // Replace with the user ID of the borrower
     type: 'Lease', // You can customize this based on your use case
   };

   fetch('https://jbjmc1ph3k.execute-api.us-east-1.amazonaws.com/prod/placequeue', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(borrowData),
   })
     .then((response) => response.json())
     .then((data) => {
       console.log('Message sent to SQS:', data);
       alert(data.message);
     })
     .catch((error) => {
       console.error('Error sending message to SQS:', error);
       // Add error handling here
     });
   console.log(`Borrow button clicked for bookId: ${bookId}`);
 };

  return (
    <div>
      <h1>Available Books</h1>
      <ol>
        {books.map((book) => (
          <li key={book.bookId}>
            <strong>Title:</strong> {book.title}
            <br />
            <strong>Author:</strong> {book.author}
            <br />
            <strong>User ID:</strong> {book.userId}
            <br />
            <strong>Status:</strong> {book.status}
            <br />
            <button onClick={() => handleBorrowClick(book.bookId)}>Borrow</button>
            <button onClick={() => handleLeaseClick(book.bookId)}>Lease</button>
            <hr />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BooksPage;
