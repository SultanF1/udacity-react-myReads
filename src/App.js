import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useState, useEffect } from "react";




function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  
  
  const [books, setBooks] = useState([]);
  const [cr, setCr] = useState([]);
  const [wtr, setWtr] = useState([]);
  const [r, setR] = useState([]);

  
  const [loading, setLoading] = useState(true);

  const getData = async function(){
        if(loading){
    const result = await BooksAPI.getAll();
      
      setBooks(result);
      const tmp = await result.filter((b) => b.shelf === 'currentlyReading')
      setCr(tmp);
      
      const tmp2 = await result.filter((b) => b.shelf === 'wantToRead')
      setWtr(tmp2);
      const tmp3 = await result.filter((b) => b.shelf === 'read')
      setR(tmp3);
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
              />
              
            </div>
            <button onClick={search} >search</button>
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
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    
                    {loading ? (
                      <h1>Loading</h1>
                    ) : (
                      cr.map(b => (
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
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{b.title}</div>
                        <div className="book-authors">{b.authors}</div>
                      </div>
                    </li>
                      ))
                    )}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {loading ? (
                      <h1>Loading</h1>
                    ) : (
                      wtr.map(b => (
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
                              <option value="wantToRead">Want to Read</option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{b.title}</div>
                        <div className="book-authors">{b.authors}</div>
                      </div>
                    </li>
                      ))
                    )}
                    
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {loading ? (
                      <h1>Loading</h1>
                    ) : (
                      r.map(b => (
                        <li key={b.id}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage:
                                `url("${b.imageLinks.thumbnail}")`,
                            }}
                          ></div>
                          <div className="book-shelf-changer">
                            <select onChange={handleChange(b)}>
                              <option value="none" disabled>
                                Move to...
                              </option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                              <option value="currentlyReading">
                                Currently Reading
                              </option>
                              <option value="wantToRead">Want to Read</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{b.title}</div>
                        <div className="book-authors">{b.authors}</div>
                      </div>
                    </li>
                      ))
                    )}
                    
                  </ol>
                </div>
              </div>
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
