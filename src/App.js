import "./App.css";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { useState, useEffect } from "react";
import Query from "./Query";

import {Link} from 'react-dom'


function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  

  
   
  
  return (
    <div className="app">
    
      {showSearchPage ? (
        <Query stateChanger = {setShowSearchpage}/>
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
