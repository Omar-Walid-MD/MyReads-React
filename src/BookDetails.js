

function BookDetails({book,selectBook})
{
    if(book!=null)
    {
        console.log(book)
    }
    return (
        <div>
            {
                book != null &&
                <div className="popup-container">
                    <div className="book-details-container">
                        <div className="book-details">
                            <img src={book.imageLinks.thumbnail}/>

                            <h1>{book.title}</h1>

                            <h2>{book.subtitle}</h2>

                            <p>Authors: {
                                book.authors != null && book.authors.map((author)=>(author===book.authors[book.authors.length-1] ? author : author + ", " ))
                            }</p>

                            <p>{book.description}</p>

                            <p>Published: {book.publisher}</p>

                            <p>Date published: {book.publishedDate}</p>

                            <p>Link: {book.previewLink}</p>

                            <p>Pages: {book.pageCount}</p>
                        </div>
                        <button className="close-book-details" onClick={function(){selectBook(null)}}>X</button>
                    </div>
                </div>
            }
        </div>
            
        
    )
}

export default BookDetails;