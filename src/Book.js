import { useState } from "react";
import { update } from "./BooksAPI";
import EditBook from "./EditBook";
import cover from "./cover.png";
import PropTypes from "prop-types";

//Book component that displays book properties (cover, title, authors) and edit button
function Book({book,handle,currentShelf})
{

    return (
        <div className="book-container">

            <div className="book-display">
                <img className="book-cover" src={book.imageLinks != null ? book.imageLinks.smallThumbnail : cover} alt="Book cover"/>
                <EditBook book={book} handle={handle} currentShelf={currentShelf} />
            </div>
            
            <p className="book-title">{book.title}</p>
            
            <p className="book-author">
            {
               book.authors != null && book.authors.map((author)=>(author===book.authors[book.authors.length-1] ? author : author + ", " ))
            }
            </p>
        </div>
    )
}

export default Book;

Book.propTypes =
{
  handle: PropTypes.func.isRequired,
  currentShelf: PropTypes.string.isRequired
}