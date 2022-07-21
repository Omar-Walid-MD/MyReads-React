import './App.css';
import Book from "./Book.js";
import BookShelf from './BookShelf';
import { Link, Routes, Route } from 'react-router-dom';
import add from "./add.png";
import back from "./back.png";
import * as BooksAPI from './BooksAPI';
import { useEffect, useState } from 'react';
import SearchResults from './SearchResults';
import PropTypes from "prop-types";
import BookDetails from './BookDetails';





//Page that displays three categories of added books
function BookShelfPage({bookLists,handle})
{

  const [bookDisplayed,setBookDisplayed] = useState(null);

  function displayBook(book)
  {
    setBookDisplayed(book)
  }

  return (
    <div className="App">

      <header className="app-header">
        MyReads
      </header>

      <section className="page-container">
        <h1 className="shelf-title">Currently Reading</h1>
        <hr/>
          <BookShelf allBooks={bookLists} handle={handle} category={"currentlyReading"} selectBook={displayBook} />
        <h1 className="shelf-title">Want to Read</h1>
        <hr/>      
          <BookShelf allBooks={bookLists} handle={handle} category={"wantToRead"} selectBook={displayBook} />
        <h1 className="shelf-title">Read</h1>
        <hr/>
          <BookShelf allBooks={bookLists} handle={handle} category={"read"} selectBook={displayBook} />
      </section>
      <div className="circle add-book-button">
        <Link to="/add" className="link">
          <img src={add} alt="Add Book" className="link-icon" />
        </Link>
      </div>
      <BookDetails book={bookDisplayed} selectBook={displayBook} />
    </div>
  
  );
}








//Page of book search and adding a new book to a list
function AddBookPage({bookLists,handle})
{

  const [searchValue,setSearchValue] = useState("");

  function handleSearchValue(event)
  {
    setSearchValue(event.target.value);
    console.log("Searching for: " + event.target.value);
  }

  const [books,setBooks] = useState([]);

  //Retrieving book results from database according to search query
  useEffect(()=>{
    const getBooks = async () => {
      const res = await BooksAPI.search(searchValue);
      setBooks(res);
    }
    getBooks();
  },[searchValue]);

  return (
    <div className="App">

      <header className="app-header">
        MyReads
      </header>

      <section className="page-container">
        <div className="search-container">
          <Link to="/" className="link">
              <img src={back} alt="Back Arrow" className="link-icon back-button"/>
          </Link>
          <input className="search-bar" type="text" placeholder="Search by title" value={searchValue} onChange={handleSearchValue} />
        </div>
        <SearchResults bookResults={books} bookLists={bookLists} handle={handle} searchValue={searchValue} />
      </section>
    </div>
  )
}








//Main App component
function App() {

  //State of object that contains all book lists
  const [bookLists,setBookLists] = useState([]);

  //Divides list of books into an object containing seperate categorized lists
  function getList(books)
  {
    setBookLists({
      read: books.filter((book)=>book.shelf==="read"),
      wantToRead: books.filter((book)=>book.shelf==="wantToRead"),
      currentlyReading: books.filter((book)=>book.shelf==="currentlyReading")
    })
  }

  //Retrieving added book lists from the database
  useEffect(()=>{
    async function getBooks()
    {
      const res = await BooksAPI.getAll();
      getList(res);
    }

    getBooks();
  },[]);

  //Function to change the current list of a book (including adding or removing a book from the lists)
  function handleBookList(targetBook,currentList,targetList)
  {

    if(currentList===targetList)
    {
      console.log("Book already in that shelf");
      return;
    }

    //Creating new temporary bookLists object
    const newBookLists = {
      read: "",
      wantToRead: "",
      currentlyReading: ""
    }

    //Creating a corresponding copy for every list. Current list will have book removed. Target list will have book added. Other lists remain unchanged 
    for(const bookList in newBookLists)
    {
      if(bookList===currentList)
      {
        newBookLists[bookList] = bookLists[bookList].filter((book)=>book.id!==targetBook.id);
      }
      else if(bookList===targetList)
      {
        newBookLists[bookList] = [...bookLists[bookList],targetBook];
      }
      else
      {
        newBookLists[bookList] = bookLists[bookList];
      }
    }

    //Updating book lists state and shelf property of the book
    setBookLists(newBookLists);
    BooksAPI.update(targetBook,targetList);
  }



  return (
    <Routes>
      <Route path="/" element={<BookShelfPage bookLists={bookLists} handle={handleBookList} />}
        />
      <Route path="/add" element={<AddBookPage bookLists={bookLists} handle={handleBookList} />} />
    </Routes>
  );
}

export default App;

BookShelfPage.propTypes =
{
  handle: PropTypes.func.isRequired
}

AddBookPage.propTypes =
{
  handle: PropTypes.func.isRequired
}