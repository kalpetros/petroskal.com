import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Pill } from "../components/pill"

const bookList = [
  {
    title: "The Clean Coder: A Code of Conduct for Professional Programmers",
    url:
      "https://www.goodreads.com/book/show/10284614-the-clean-coder?ac=1&from_search=true&qid=KBtqn55gTY&rank=1",
    genre: "swe",
    authors: ["Robert C. Martin"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1347470803l/10284614.jpg",
  },
  {
    title: "The Pragmatic Programmer: From Journeyman to Master",
    url:
      "https://www.goodreads.com/book/show/4099.The_Pragmatic_Programmer?ac=1&from_search=true&qid=6iiircXjVH&rank=1",
    genre: "swe",
    authors: ["Andy Hunt", "Dave Thomas"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1401432508l/4099.jpg",
  },
  {
    title: "Working Effectively with Legacy Code",
    url:
      "https://www.goodreads.com/book/show/44919.Working_Effectively_with_Legacy_Code?ac=1&from_search=true&qid=LbXgV9aQim&rank=1",
    genre: "swe",
    authors: ["Michael C. Feathers"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1348627451l/44919.jpg",
  },
  {
    title: "Cracking the Coding Interview",
    url:
      "https://www.goodreads.com/book/show/54845619-cracking-the-coding-interview?ac=1&from_search=true&qid=6e8zVGw5p8&rank=2",
    genre: "swe",
    authors: ["Gayle Laakmann McDowell"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1596829126l/54845619._SX318_.jpg",
  },
  {
    title: "Patterns of Enterprise Application Architecture",
    url:
      "https://www.goodreads.com/book/show/70156.Patterns_of_Enterprise_Application_Architecture?ac=1&from_search=true&qid=Z81NJm1s4K&rank=1",
    genre: "swe",
    authors: [
      "Martin Fowler",
      "David Rice",
      "Matthew Foemmel",
      "Edward Hieatt",
      "Robert Mee, Randy Stafford",
    ],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1440294142l/70156._SX318_.jpg",
  },
  {
    title: "Refactoring: Improving the Design of Existing Code",
    url:
      "https://www.goodreads.com/book/show/44936.Refactoring?ac=1&from_search=true&qid=7mWodMGIp8&rank=",
    genre: "swe",
    authors: ["Martin Fowler", "Kent Beck", "Don Roberts", "Erich Gamma"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386925632l/44936.jpg",
  },
  {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    url:
      "https://www.goodreads.com/book/show/3735293-clean-code?ac=1&from_search=true&qid=wmprKma9WO&rank=1",
    genre: "swe",
    authors: ["Robert C. Martin"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1436202607l/3735293._SX318_.jpg",
  },
  {
    title: "Code Complete",
    url: "https://www.goodreads.com/book/show/4845.Code_Complete",
    genre: "swe",
    authors: ["Steve McConnell"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1396837641l/4845.jpg",
  },
  {
    title: "Head First Design Patterns",
    url: "https://www.goodreads.com/book/show/58128.Head_First_Design_Patterns",
    genre: "swe",
    authors: ["Eric Freeman", "Kathy Sierra", "Bert Bates", "Elisabeth Robson"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1408309444l/58128.jpg",
  },
  {
    title: "Test Driven Development: By Example",
    url: "https://www.goodreads.com/book/show/387190.Test_Driven_Development",
    genre: "swe",
    authors: ["Kent Beck"],
    image:
      "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1372039943l/387190.jpg",
  },
]

const Books = () => {
  const list = bookList.map((book, index) => {
    const authors =
      book.authors.length > 1
        ? `${book.authors[0]} +${book.authors.length - 1}`
        : book.authors[0]
    const authorsEl = <Pill title={authors} />

    return (
      <div
        key={`book-${index}`}
        className="bg-gray-100 rounded-lg p-4 mb-4 grid grid-cols-2 gap-4 items-center"
      >
        <div>
          <a href={book.url} target="__blank">
            {book.title}
          </a>
        </div>
        <div className="grid grid-flow-col auto-cols-max gap-2 items-center justify-end">
          <div>{authorsEl}</div>
          <div>
            <Pill title={book.genre} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <Layout>
      <SEO title="Books" />
      <h1>Books</h1>
      <p>
        Below you will find a list of books I've read that I think they are
        worth having a look. This list is not limited to software engineering,
        hence every interesting book that I come across will be added here.
      </p>
      <div>{list}</div>
    </Layout>
  )
}

export default Books
