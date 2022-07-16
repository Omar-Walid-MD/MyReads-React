import { useState } from "react";
import edit from "./edit.png";
import PropTypes from "prop-types";


//Edit Button component
function EditBook({book,handle,currentShelf})
{

    //List of options
    const options = [
        {
            name: "Currently Reading",
            code: "currentlyReading",
            id: 0
        },
        {
            name: "Want to Read",
            code: "wantToRead",
            id: 1
        },
        {
            name: "Read",
            code: "read",
            id: 2
        },
        {
            name: "None (Remove)",
            code: "none",
            id: 3
        },
    ];

    //Checking off other menu checkboxes when one is checked on to avoid leaving multiple menus open simultaneously
    function setCheckBoxes(event)
    {
        const checkboxes = document.querySelectorAll(".options-checkbox");
        const thisCheckbox = event.target;

        if(thisCheckbox.checked)
        {
            for(let i = 0; i < checkboxes.length; i++)
            {
                if(checkboxes[i]!==thisCheckbox)
                {
                    checkboxes[i].checked = false;
                }
            }
        }
    }


    return (
        <div className="edit-container">
            <label className="open-label" htmlFor={"open-options-"+book.id}>
                <div className="circle">
                    <img src={edit} alt="Dropdown Arrow" className="edit-book-button"/>
                </div>
            </label>
            <input type="checkbox" className="options-checkbox" id={"open-options-"+book.id} onClick={setCheckBoxes}/>
            <div className="options-menu-container">
                <p className="options-label">Move to...</p>
                <label className="open-label" htmlFor={"open-options-"+book.id}>
                {
                    options.map((option)=>(
                        <p className={currentShelf===option.code ? "option option-current" : "option"} onClick={function(){handle(book,currentShelf,option.code);}} key={option.id}>{option.name}</p>
                ))
                }
                </label>
            </div>
        </div>
    )
}


export default EditBook;

EditBook.propTypes =
{
  book: PropTypes.object.isRequired,
  handle: PropTypes.func.isRequired,
  currentShelf: PropTypes.string.isRequired
}