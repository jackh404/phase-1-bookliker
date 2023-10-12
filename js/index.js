let activeBook
let currentUser = {
    "id":14,
    "username":"captainoftime"
}
const likeBtn = document.getElementById('likeBtn')
likeBtn.addEventListener("click", e => {
    if(activeBook.users.findIndex(user => user.id == currentUser.id) > -1){
        const index = activeBook.users.findIndex(user => user.id == currentUser.id)
        const newUserList = activeBook.users.slice(0,index).concat(activeBook.users.slice(index+1))
        fetch(`http://localhost:3000/books/${activeBook.id}`,{
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "users": newUserList
            })
        })
        .then(resp=>resp.json())
        .then(book => displayBook(book))
    } else {
        fetch(`http://localhost:3000/books/${activeBook.id}`,{
            method: "PATCH",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                "users": [
                    ...activeBook.users,
                    currentUser
                ]
            })
        })
        .then(resp=>resp.json())
        .then(book => displayBook(book))
    }
})

const fetchBookList = () => {
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(data => {
        data.forEach(book => titleList(book));
    })
}
const titleList = (book) => {
    const bookLi = document.createElement('li')
    bookLi.textContent = book.title
    bookLi.addEventListener("click", e => displayBook(book))
    document.getElementById('list').append(bookLi)
}
const displayBook = (book) => {
    //console.log(book)
    activeBook = book
    document.getElementById('likeBtn').classList.remove('hidden')
    document.getElementById('liked').classList.remove('hidden')
    const cover = document.getElementById('cover')
    cover.src = book.img_url
    cover.alt = `Cover image for ${book.title}`

    document.getElementById('title').textContent = book.title
    document.getElementById('subtitle').textContent = book.subtitle
    document.getElementById('author').textContent = book.author
    document.getElementById('description').textContent = book.description

    const likeList = document.getElementById('likeList')
    likeList.textContent = ""

    for(let user of book.users){
        const userLi = document.createElement('li')
        userLi.textContent = user.username
        likeList.append(userLi)
    }
}
fetchBookList()