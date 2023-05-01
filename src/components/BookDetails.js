import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function BookDetails() {
  const [itemData, setItemData] = useState([]);
  const navigate = useNavigate();
  const [loading, isLoading] = useState(false);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    async function FetchData() {
      isLoading(true);
      const res = await fetch("/data.json");
      const data = await res.json();
      const selectedItem = data.filter((item) => item.title === id);
      console.log(selectedItem);
      setItemData(...selectedItem);
      isLoading(false);
      console.log(itemData);
    }
    FetchData();
  }, [id]);
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-700 text-[#fff] p-3"
      >
        back
      </button>
      {loading ? (
        <h2 className="text-3xl my-20 text-center">loading.....</h2>
      ) : (
        <div className=" lg:mt-[20%] lg:flex lg:gap-5 lg:items-center">
          <section className="w-3/5 md:w-2/5 lg:w-[20%] relative bg-[#fff] border border-[#fff] p-4 mt-16 mb-12 mx-auto shadow-xl">
            <img src={itemData.imageLink} alt="bookcover" className="w-full" />
          </section>
          <div className="w-4/5 lg:w-1/2 mb-10 mx-auto flex flex-col items-center p-4 text-[#fff] bg-blue-900 rounded">
            <div className="book-description text-black p-3 lg:flex lg:flex-wrap lg:justify-center">
              <div className="lg:flex lg:items-center lg:justify-center lg:gap-10 w-full">
                <h2 className="text-3xl text-red-800 text-center text-bold ">
                  {itemData.title}
                </h2>
                <h3 className="flex gap-3 justify-center text-2xl mt-3">
                  <span>by</span> {itemData.author}
                </h3>
              </div>
              <h3 className="flex gap-3 justify-center text-xl mt-3 w-full">
                <span>Genre:</span> {itemData.genre}
              </h3>
              <h4 className="text-2xl underline w-full text-center text-bold text-blue-700 mt-2">
                Description
              </h4>

              <div className="text-black text-center p-3 lg:w-3/5">
                <p>{itemData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
