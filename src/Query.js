import { useState } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Link } from "react-router-dom";
function Query() {
  const shelves = [
    {
      id: "1",
      shelfName: "currentlyReading",
      shelfDisplayName: "Currently Reading",
    },
    { id: "2", shelfName: "wantToRead", shelfDisplayName: "Want To Read" },
    { id: "3", shelfName: "read", shelfDisplayName: "Read" },
    { id: "4", shelfName: "none", shelfDisplayName: "None" },
  ];

  const [searchResults, setResults] = useState([]);
  const [found, setFound] = useState(false);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async function () {
    if (loading) {
      const result = await BooksAPI.getAll();

      setBooks(result);

      if (books.length !== 0) {
        setLoading(false);
      }
    }
  };

  function find(id) {
    for (let b of books) {
      if (b.id === id) {
        return b;
      }
    }
  }
  getData();
  const search = async function () {
    setFound(false);
    let element = document.getElementById("search");

    try {
      const result = await BooksAPI.search(element.value);

      if (typeof result.length !== "undefined") {
        let booksIds = books.map((b) => b.id);

        function filterShelves() {
          for (let i of result) {
            if (booksIds.includes(i.id)) {
              i.shelf = find(i.id).shelf;
              BooksAPI.update(i, find(i.id).shelf);
            } else {
              i.shelf = "none";
            }
          }
        }
        await filterShelves();

        setFound(true);

        const filtered = result.filter(
          (b) => typeof b.imageLinks !== "undefined"
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (b) => (event) => {
    BooksAPI.update(b, event.target.value);
    b.shelf = event.target.value;

    setLoading(true);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            id="search"
            onChange={search}
          />
        </div>
      </div>
      <div className="search-books-results">
        {found ? (
          <div className="bookshelf">
            {loading ? (
              <h1>loading</h1>
            ) : (
              shelves.map((s) => (
                <div key={s.id}>
                  <h2 className="bookshelf-title">{s.shelfDisplayName}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {searchResults
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
                                    backgroundImage: `url("${b.imageLinks.thumbnail}")`,
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
                                    <option value="wantToRead">
                                      Want to Read
                                    </option>
                                    <option value="read">Read</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{b.title}</div>
                              <div className="book-authors">{b.authors}</div>
                            </div>
                          </li>
                        ))}
                    </ol>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <h1>Not found</h1>
        )}
      </div>
    </div>
  );
}

export default Query;
