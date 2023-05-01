import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useFetch } from './useFetch';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchBook, setBookSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        isLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const filteredItem = books.filter(
    (item) =>
      item.title.toLowerCase().includes(searchBook.toLowerCase()) ||
      item.author.toLowerCase().includes(searchBook.toLowerCase())
  );
  const pages = [1, 2, 3, 4, 5];
  const perPage = 4;
  const start = page * perPage - perPage;
  const end = perPage * page;
  return loading ? (
    <h2 className="text-3xl my-20 text-center">loading.....</h2>
  ) : (
    <div className="lg:flex lg:justify-center w-full lg:mt-[10%]">
      <section className="lg:w-2/5">
        <h1 className="text-3xl md:text-4xl my-10 mx-auto text-center p-5 font-semibold md:w-4/5 lg:w-4/5">
          Explore exciting books that would change your perspective
        </h1>
        <div className="relative">
          <div className="w-4/5 relative z-30 md:w-3/5 lg:w-4/5 h-[70px] p-2 mt-4 mb-10 mx-auto gap-2 flex items-center">
            <input
              onChange={(e) => setBookSearch(e.target.value)}
              value={searchBook}
              type="text"
              name="book-search-bar"
              id="book-search-bar"
              placeholder="search by title or by aurthor of book"
              className="h-full px-4 w-4/5 outline outline-blue-700"
            />
            <label
              for="book-search-bar"
              className="bg-blue-700 text-[#fff] p-3 hover:bg-blue-900 "
              onClick={() => setBookSearch("")}
            >
              search
            </label>
          </div>
          {searchBook ? (
            <div className="overflow-content absolute lg:top-[100%] -top-12 z-20 border border-[#fff] scrollbar- left-[5%] w-[90%] h-auto max-h-[50px] overflow-auto">
              {filteredItem.map((item, i) => (
                <div
                  className="bg-[#fff] border-b border-b-gray-500 p-2"
                  key={item.title}
                >
                  <Link to={`${item.title}`}>{item.title}</Link>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>
      <section className="lg:w-1/2">
        <table className="w-[90%] md:w-4/5 lg:w-[90%] mx-auto p-3">
          <thead className="text-center h-[60px] border-4 border-blue-900">
            <tr>
              <th className="w-[30%] bg-blue-900 text-[#fff] border-r border border-r-blue-900 text-center">
                Title
              </th>
              <th className="w-[25%] bg-blue-900 text-[#fff] border-r border-r-blue-900">
                Author
              </th>
              <th className="w-[25%] bg-blue-900 text-[#fff] border-r border-r-blue-900">
                Publi. Date
              </th>
              <th className="w-[25%] bg-blue-900 text-[#fff] border-r border-r-blue-900">
                Genre
              </th>
            </tr>
          </thead>
          <tbody className=" gap-3">
            {books.slice(start, end).map((item, i) => (
              <tr
                className="bg-[#fff] text-sm py-2 my-3 h-[100px] sm border-2 border-x-[#fff] border-b-blue-700"
                key={item.link}
              >
                <td className="text-blue-500 pl-3 w-[30%] border-r border-r-blue-700 text-base">
                  <Link to={`${item.title}`} preventScrollReset={true}>
                    {item.title}
                  </Link>
                </td>
                <td className="w-[25%] pl-3 border-r border-r-blue-700">
                  {item.author}
                </td>
                <td className="w-[10%] pl-3 border-r border-r-blue-700">
                  {item.year}
                </td>
                <td className="w-[20%] pl-3 border-r border-r-blue-700">
                  {item.genre}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-2 w-4/5 mx-auto my-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((page) => page - 1)}
            className="px-1 text-[#fff]"
            style={{ backgroundColor: "blue" }}
          >{`<<`}</button>
          {pages.map((index) => (
            <button
              disabled={page === index}
              className="w-[10%] py-1 text-[#fff]"
              style={{ backgroundColor: "blue" }}
              onClick={() => setPage(index)}
              key={index}
            >
              {index}
            </button>
          ))}
          <button
            disabled={page > pages.length}
            onClick={() => setPage((page) => page + 1)}
            className="px-1 text-[#fff]"
            style={{ backgroundColor: "blue" }}
          >{`>>`}</button>
        </div>
      </section>
    </div>
  );
}

export default BookList;
