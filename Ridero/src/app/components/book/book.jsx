import React, { useState } from 'react';
import styles from './book.module.css'

const Book = ({ book, index, handleEditBook, handleUpdateBook, handleRemoveBook, editingBook, handleImageUpload, gallery }) => {

  return (
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
          <div>
          <input type="file" onChange={(event) => handleImageUpload(book.id, event)} />
          </div>
          <button className={`${styles.btnSave} ${styles.btn}`} type='submit'>
            Сохранить изменения
          </button>
        </form>
      ) : (
        <>
          {<img className={styles.imgCover} src={gallery?.find(item => item.id === book.id)?.base64} alt="Обложка книги" />}
          <span className='book-title'>
            {book.id}. {book.booksAuthor}: "{book.booksName}"
          </span>
          <button
            className={`${styles.btnChange} ${styles.btn}`}
            onClick={() => handleEditBook(index)}
          >
            Изменить
          </button>
          <button
            className={`${styles.btnDelete} ${styles.btn}`}
            onClick={() => handleRemoveBook(index)}
          >
            Удалить
          </button>
        </>
      )}
    </li>
  );
};

export default Book;