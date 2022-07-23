

function BookDetails({book,selectBook})
{
    document.onkeydown = function keyPress (e) {
        if(e.key === "Escape") {
            if(book!=null)
            {
                console.log("Closed info window");
                selectBook(null);
            }
        }
    }
    
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
                            <div className="book-details-header">
                                <h1>{book.title}</h1>
                                <h2>{book.subtitle}</h2>
                            </div>
                            <div className="book-info">
                                <div className="book-info-right">
                                    <div className="book-info-cover">
                                        <img className="book-info-cover-image" src={book.imageLinks.thumbnail}/>
                                    </div>
                                    <div className="book-info-details">
                                        <p><b>Authors:</b> {
                                            book.authors != null && book.authors.map((author)=>(author===book.authors[book.authors.length-1] ? author : author + ", " ))
                                        }</p>
                                        
                                        <p><b>Category:</b> {book.categories}</p>
                                        <p><b>Published:</b> {book.publisher}</p>
                                        <p><b>Date published:</b> {book.publishedDate}</p>
                                        <p><b>Pages:</b> {book.pageCount}</p>
                                    </div>
                                </div>
                                <div className="book-info-left">
                                    <h3>Description:</h3>
                                    <div className="book-info-desc">
                                        {
                                            book.description != null ? book.description : "N/A"
                                        }
                                    </div>
                                    <h3>Links:</h3>
                                    <div className="book-info-links">
                                        <a className="book-link" href={book.previewLink}>Preview</a>
                                        <a className="book-link" href={book.canonicalVolumeLink}>Canonical Volume</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="close-book-details" onClick={function(){selectBook(null)}}>X</button>
                    </div>
                </div>
            }
        </div>
            
        
    )
}

export default BookDetails;