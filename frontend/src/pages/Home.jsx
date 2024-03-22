import axios from "axios";
import Spinner from "../components/Spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "./home/BooksTable";
import BooksCard from "./home/BooksCard";

const Home = () => {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setloading(true);
    axios
      .get("http://localhost:6969/books")
      .then((response) => {
        setbooks(response.data.data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};
export default Home;
