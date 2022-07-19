import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";

function Bookshelf(){

    const shelves = [ { id: "1", shelfName: "currentlyReading", shelfDisplayName: "Currently Reading" }, { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want To Read" },
    { id: "3", shelfName: "read", shelfDisplayName: "Read" }];
    
    
    
    
  
    
  


  
    const [books, setBooks] = useState([]);
  

  
    const [loading, setLoading] = useState(true);
  
    const getData = async function(){
          if(loading){
      const result = await BooksAPI.getAll();
        
        setBooks(result);
        
        if (books.length !== 0){
          setLoading(false);
          
    }
          }
  }
    
    
  
    
      getData()
    
    const handleChange = b => event => {
      
      BooksAPI.update(b, event.target.value)
      setLoading(true);
      getData()
    }



    
    return(
        
        <div className="bookshelf">
        { shelves.map((s) => (
        <div key={ s.id }>
        <h2 className="bookshelf-title">{ s.shelfDisplayName }</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
        {loading ? (
            <h1>loading</h1>
        ) : ( books
        .filter((f) => f.shelf === s.shelfName)
        .map((b) => (
            <li key={b.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage:
                      `url("${b.imageLinks.thumbnail}")`,
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select onChange={handleChange(b)}>
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="none">None</option>
                    <option value="currentlyReading">
                      Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{b.title}</div>
              <div className="book-authors">{b.authors}</div>
            </div>
          </li>
        )) )}
        </ol>
        </div>
        </div>
        )) }
        </div>
    );




}

export default Bookshelf;