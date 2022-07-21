import { useState } from "react";
import { update } from "./BooksAPI";
import EditBook from "./EditBook";
import cover from "./cover.png";
import PropTypes from "prop-types";
import BookDetails from "./BookDetails";

//Book component that displays book properties (cover, title, authors) and edit button
function Book({book,handle,currentShelf,selectBook})
{
    function overlapping(event,b)
    {
        let y = b.getBoundingClientRect();
        let top = y.top + window.pageYOffset;
        let bottom = y.bottom + window.pageYOffset;

        return (event.pageY > top && event.pageY < bottom)
    }

    function testDrag(event)
    {
        let allShelves = document.querySelectorAll('.book-shelf');

        for(const shelf of allShelves)
        {
            if (overlapping(event,shelf))
            {
                let targetShelf = shelf.getAttribute("category");
                console.log(targetShelf);
                handle(book,currentShelf,targetShelf)
            }
        }
    }

    return (
        <div className="book-container" draggable="true" onDragEnd={testDrag}>
            <label htmlFor={"display-book-" + book.id} className="open-label">
                <div className="book-display">
                    <img className="book-cover" src={book.imageLinks != null ? book.imageLinks.smallThumbnail : cover} alt="Book cover"/>
                    <EditBook book={book} handle={handle} currentShelf={currentShelf} />
                </div>
            </label>
            <button className="open-book-details" id={"display-book-" + book.id} onClick={function(){selectBook(book)}}></button>
            
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