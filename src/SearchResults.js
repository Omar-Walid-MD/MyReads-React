import { useEffect, useState } from "react";
import Book from "./Book"
import * as BooksAPI from './BooksAPI';


function SearchResults({bookResults,bookLists,handle})
{
    //Finding if a book in the search results has a copy in one of the bookshelves and returning that bookshelf
    function getShelf(bookResult)
    {

        for(const bookShelf in bookLists)
        {
            for(const book of bookLists[bookShelf])
            {
                if(bookResult.id===book.id)
                {
                    console.log("Found book: " + book.title + " in " + bookShelf);
                    return bookShelf;
                }
            }
        }

            return "none";

    }
    return (
        <div className="results">
            {
             (bookResults != null && bookResults.length != undefined) && bookResults.map((book)=><Book key={book.id} book={book} currentShelf={getShelf(book)} handle={handle}/>)
            }
        </div>
    )
}

export default SearchResults;