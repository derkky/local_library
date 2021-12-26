import { useState, useEffect } from "react"
import {BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"

import Home from "./components/Home"
import Author from "./components/Author"
import CreateAuthor from "./components/CreateAuthor"
import CreateBook from "./components/CreateBook"
import CreateBookInstance from "./components/CreateBookInstance"
import CreateGenre from "./components/CreateGenre"
import "./styles/styles.css"
import Genre from "./components/Genre"
import Book from "./components/Book"
import BookInstance from "./components/BookInstance"
import GenreDetail from "./components/GenreDetail"
import BookDetail from "./components/BookDetail"
import AuthorDetail from "./components/AuthorDetail"
import BookInstanceDetail from "./components/BookInstanceDetail"
import UpdateBook from "./components/UpdateBook"
import UpdateAuthor from "./components/UpdateAuthor"
import UpdateBookInstance from "./components/UpdateBookInstance"
import UpdateGenre from "./components/UpdateGenre"

function App() {


  return (
    <div>
      <BrowserRouter>
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/author/all" element={<Author/>}/>
            <Route path="/book/all" element={<Book/>}/>
            <Route path="/bookinstance/all" element={<BookInstance/>}/> 
            <Route path="/genre/all" element={<Genre/>} />

            <Route path="/author/create" element={<CreateAuthor/>}/>
            <Route path="/book/create" element={<CreateBook/>} />
            <Route path="/bookinstance/create" element={<CreateBookInstance/>}/>
            <Route path="/genre/create" element={<CreateGenre/>}/>

            <Route path="/author/:id" element={<AuthorDetail/>}/>
            <Route path="/book/:id" element={<BookDetail/>}/>
            <Route path="/bookinstance/:id" element={<BookInstanceDetail/>}/>
            <Route path="/genre/:id" element={<GenreDetail/>}/>

            <Route path="/author/:id/update" element={<UpdateAuthor/>}/>
            <Route path="/book/:id/update" element={<UpdateBook/>}/>
            <Route path="/bookinstance/:id/update" element={<UpdateBookInstance/>}/>
            <Route path="/genre/:id/update" element={<UpdateGenre/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
