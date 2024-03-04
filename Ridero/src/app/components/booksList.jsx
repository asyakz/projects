import React, { useState, useEffect } from 'react';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books'));
    if (savedBooks) {
      const initialBooks = [
        { booksName: 'Автостопом по галактике', booksAuthor: 'Дуглас Адамс' },
        { booksName: 'Транссерфинг реальности', booksAuthor: 'Вадим Зеланд' },
        { booksName: 'Сестра Керри', booksAuthor: 'Теодор Драйзер' }
      ];
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
      booksName: event.target.booksName.value,
      booksAuthor: event.target.booksAuthor.value
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
      booksName: event.target.booksName.value,
      booksAuthor: event.target.booksAuthor.value
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
          <li className='item' key={index}>
            {editingBook === book ? (
              <form
                key={index}
                onSubmit={(event) => handleUpdateBook(index, event)}
              >
                <input
                  type='text'
                  name='booksAuthor'
                  defaultValue={book.booksAuthor}
                />
                <input
                  type='text'
                  name='booksName'
                  defaultValue={book.booksName}
                />
                <button className='btn-save btn' type='submit'>
                  Сохранить изменения
                </button>
              </form>
            ) : (
              <>
                <span className='book-title'>
                  {book.booksAuthor}: {book.booksName}
                </span>
                <button
                  className='btn-change btn'
                  onClick={() => handleEditBook(index)}
                >
                  Изменить
                </button>
                <button
                  className='btn-delete btn'
                  onClick={() => handleRemoveBook(index)}
                >
                  Удалить
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default BooksList;
