import React, { useState, useEffect } from 'react';
import Book from '../book/book';
import styles from './booksList.module.css';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [gallery, setGallery] = useState([]);

  const initialBooks = [
    { id: 1, booksName: 'Автостопом по галактике', booksAuthor: 'Дуглас Адамс', source: '' },
    { id: 2, booksName: 'Транссерфинг реальности', booksAuthor: 'Вадим Зеланд', source: '' },
    { id: 3, booksName: 'Сестра Керри', booksAuthor: 'Теодор Драйзер', source: '' }
  ];

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books'));
    if (savedBooks) {
      setBooks(initialBooks);
      localStorage.setItem('books', JSON.stringify(initialBooks));
    } else {
      setBooks(savedBooks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (event) => {
    event.preventDefault();
    const newBook = {
      id: books.length + 1,
      booksName: event.target.booksName.value,
      booksAuthor: event.target.booksAuthor.value,
      sourse: ''
    };
    if (
      event.target.booksName.value !== '' &&
      event.target.booksAuthor.value !== ''
    ) {
      setBooks([...books, newBook]);
      event.target.booksName.value = '';
      event.target.booksAuthor.value = '';
    }
  };

  const handleEditBook = (index) => {
    setEditingBook(books[index]);
  };

  const handleUpdateBook = (index, event) => {
    event.preventDefault();
    const updatedBook = {
      id: books[index].id,
      booksName: event.target.booksName.value,
      booksAuthor: event.target.booksAuthor.value,
      sourse: books[index].sourse
    };
    const updatedBooks = [...books];
    updatedBooks[index] = updatedBook;
    setBooks(updatedBooks);
    setEditingBook(null);
  };

  const handleRemoveBook = (index) => {
    const updatedBooks = [...books];
    updatedBooks.splice(index, 1);
    setBooks(updatedBooks);
  };

  const handleImageUpload = (bookId, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
   
    reader.onloadend = () => {
       const img = new Image();
       img.src = reader.result;
       img.onload = () => {
         const canvas = document.createElement('canvas');
         const booksIMG = canvas.getContext('2d');
         canvas.width = 145;
         canvas.height = 205;
         booksIMG.drawImage(img, 0, 0, 145, 205);
         const base64 = canvas.toDataURL('image/png');
   
         let storedImages = JSON.parse(localStorage.getItem('gallery')) || [];
         const imageIndex = storedImages.findIndex(item => item.id === bookId);
   
         if (imageIndex !== -1) {
           storedImages[imageIndex].base64 = base64;
         } else {
           const newImage = {
             id: bookId,
             base64: base64
           };
           storedImages.push(newImage);
         }
   
         localStorage.setItem('gallery', JSON.stringify(storedImages));
         setGallery(JSON.parse(localStorage.getItem('gallery')));
       };
    };
    reader.readAsDataURL(file);
   };

  return (
    <>
      <form onSubmit={handleAddBook}>
        <input type='text' name='booksAuthor' placeholder='Автор' />
        <input type='text' name='booksName' placeholder='Название книги' />
        <button className='btn btn-add' type='submit'>
          + Добавить новую книгу
        </button>
      </form>
      <ul>
        {books.map((book, index) => (
          <Book key={index} book={book} index={index} handleEditBook={handleEditBook} handleUpdateBook={handleUpdateBook} handleRemoveBook={handleRemoveBook} editingBook={editingBook} handleImageUpload={handleImageUpload} gallery={gallery} />
        ))}
      </ul>
    </>
  );
};

export default BooksList;
