import "./App.css";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { useState, useEffect } from "react";




function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [searchResults, setResults] = useState([]);
  const [found, setFound] = useState(false);
  
  const search = async function(){
    setFound(false);
    let element = document.getElementById('search');
    
    try{
    const result = await BooksAPI.search(element.value)
    
    
    
    if (typeof result.length !== 'undefined'){

      setFound(true);
      
      const filtered = result.filter(b => typeof b.imageLinks !== 'undefined')
      setResults(filtered)
    }
    else{
      console.log('no')
    }
  }
  catch(e){
    console.log(e)
  }
  }


  const handleChange = b => event => {
      
    BooksAPI.update(b, event.target.value)
    
    
  }
  return (
    <div className="app">
    
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                id='search'
                onChange = {search}
              />
              
            </div>
            
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
            {found ? (
              
                searchResults.map(b => (
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
                ))
                
              ) : (
                <h1>Not found</h1>
              )}
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              
                <Bookshelf></Bookshelf>
              
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
