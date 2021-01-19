document.addEventListener("DOMContentLoaded", function() {});

//load list 
getBooks()
selectedBook = {}
allBooks = []

show = document.querySelector('#show-panel')
show.classList.add('hide')
img = document.createElement('img')
title = document.createElement('h1')
subtitle = document.createElement('h2')
author = document.createElement('h3')
description = document.createElement('p')
btn = document.createElement('button')
likes = document.createElement('ul')
show.appendChild(img)
show.appendChild(title)
show.appendChild(title)
show.appendChild(subtitle)
show.appendChild(author)
show.appendChild(description)
show.appendChild(likes)
show.appendChild(btn)



//fetch all books
function getBooks () {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => books.forEach(book => addToBooksList(book)))
}

function fetchOneBook(id) {
    fetch(`http://localhost:3000/books/${id}`)
    .then(resp => resp.json())
    .then(book => {loadBook(book)})
}

function fetchUser() {
    fetch('http://localhost:3000/users/1')
    .then(resp => resp.json())
    .then(user => updateLikes(user))
}

function patchBook(book) {
    const configObj = {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json',
      },
        body:JSON.stringify(book)
      }

    fetch(`http://localhost:3000/books/${book.id}`, configObj)
    .then(resp => resp.json())
    .then(book => loadBook(book))
}



function addToBooksList(book) {
    let ul = document.querySelector('#list')
    let li = document.createElement('li')
    li.textContent = book.title
    li.id = book.id
    allBooks.push(book)
    li.addEventListener('click', handleClick)
    ul.appendChild(li)
    loadBook(allBooks[0])
}


function loadBook(book) {
    selectedBook = book
    let img = show.querySelector('img')
    let title = show.querySelector('h1')
    let subtitle = show.querySelector('h2')
    let author = show.querySelector('h3')
    let description = show.querySelector('p')
    let userList = show.querySelector('ul')
    let btn = show.querySelector('button')
    
    
    // content
    img.src = book.img_url
    title.textContent = book.title
    subtitle.textContent = book.subtitle
    author.textContent = book.author
    description.textContent = book.description
    btn.innerHTML = "Like"
    btn.addEventListener('click',fetchUser)
    userList.innerHTML = ''

    book.users.forEach(user => {
        let li = document.createElement('li')
        li.textContent = user.username
        userList.appendChild(li)
    })
}

function handleClick(e) {
    fetchOneBook(e.target.id)
}

function updateLikes(user) {
    selectedBook.users.push(user)
    patchBook(selectedBook)
}

