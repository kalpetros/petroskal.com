import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const bookList = [
  {
    title: "The Clean Coder: A Code of Conduct for Professional Programmers",
    url:
      "https://www.goodreads.com/book/show/10284614-the-clean-coder?ac=1&from_search=true&qid=KBtqn55gTY&rank=1",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347470803l/10284614.jpg",
  },
  {
    title: "The Pragmatic Programmer: From Journeyman to Master",
    url:
      "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer?ac=1&from_search=true&qid=6iiircXjVH&rank=1",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1401432508l/4099.jpg",
  },
  {
    title: "Working Effectively with Legacy Code",
    url:
      "https://www.goodreads.com/book/show/44919.Working_Effectively_with_Legacy_Code?ac=1&from_search=true&qid=LbXgV9aQim&rank=1",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348627451l/44919.jpg",
  },
  {
    title: "Cracking the Coding Interview",
    url:
      "https://www.goodreads.com/book/show/54845619-cracking-the-coding-interview?ac=1&from_search=true&qid=6e8zVGw5p8&rank=2",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1596829126l/54845619._SX318_.jpg",
  },
  {
    title: "Patterns of Enterprise Application Architecture",
    url:
      "https://www.goodreads.com/book/show/70156.Patterns_of_Enterprise_Application_Architecture?ac=1&from_search=true&qid=Z81NJm1s4K&rank=1",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440294142l/70156._SX318_.jpg",
  },
  {
    title: "Refactoring: Improving the Design of Existing Code",
    url:
      "https://www.goodreads.com/book/show/44936.Refactoring?ac=1&from_search=true&qid=7mWodMGIp8&rank=",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925632l/44936.jpg",
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    url:
      "https://www.goodreads.com/book/show/3735293-clean-code?ac=1&from_search=true&qid=wmprKma9WO&rank=1",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg",
  },
  {
    title: "Code Complete",
    url: "https://www.goodreads.com/book/show/4845.Code_Complete",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396837641l/4845.jpg",
  },
  {
    title: "Head First Design Patterns",
    url: "https://www.goodreads.com/book/show/58128.Head_First_Design_Patterns",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408309444l/58128.jpg",
  },
  {
    title: "Test Driven Development: By Example",
    url: "https://www.goodreads.com/book/show/387190.Test_Driven_Development",
    genre: "swe",
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1372039943l/387190.jpg",
  },
]

const Books = props => {
  const list = bookList.map((book, index) => {
    return (
      <li key={`book-${index}`} className="mb-4">
        <a className="underline" href={book.url} target="__blank">
          {book.title}
        </a>
      </li>
    )
  })

  return (
    <Layout>
      <SEO title="Books" />
      <h1>Books</h1>
      <p>
        Below you will find a list of books I've read that I think they are
        worth having a look. This list is not limited to software engineering,
        hence every intersting book that I come across will be added here.
      </p>
      <h2>Software Engineering</h2>
      <ul className="list-disc ml-6">{list}</ul>
    </Layout>
  )
}

export default Books
