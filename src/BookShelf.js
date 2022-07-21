import { useEffect, useState } from "react";
import Book from "./Book";
import * as BooksAPI from './BooksAPI';
import PropTypes from "prop-types";


//BookShelf component that displays books of a given category
function BookShelf({allBooks,category,handle,selectBook})
{
    const books = allBooks[category]
    return (
        <div className="shelf-container">
                {
                    books!=null && books.length > 0 ?
                        <div className="book-shelf" category={category}> 
                        {
                            books.map((book)=><Book key={book.id} book={book} handle={handle} currentShelf={category} selectBook={selectBook} />)
                        }
                        </div>

                        : <h1 className="shelf-empty-message">There are no books in this shelf</h1>
                }
            
        </div>
    )
}

export default BookShelf;

BookShelf.propTypes =
{
  category: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired
}