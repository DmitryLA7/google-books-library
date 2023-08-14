import { useEffect, useState } from "react";
import getBooks from "./api/getBooks";
import { useDispatch, useSelector } from "react-redux";
import { addBooksToList, setTotalBooksQuantity } from "./store/booksSlice";
import SearchForm from "./components/SearchForm";
import BooksList from "./components/BooksList";
import { IsDataFetchedType, SearchFormType } from "./models/types";
import { RootState } from "./store";
import "./assets/styles/index.scss";

function App() {
  const [searchForm, setSearchForm] = useState<SearchFormType>({
    bookName: { value: "" },
    category: { value: "" },
    orderBy: { value: "relevance" },
  });
  const [isDataFetched, setIsDataFetched] = useState<IsDataFetchedType>({
    quantity: 0,
    load: false,
  });
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const totalBooks = useSelector(
    (state: RootState) => state.booksSlice.totalBooks
  );

  useEffect(() => {
    const abortCtrl = new AbortController();
    const options = { signal: abortCtrl.signal };

    if (isDataFetched.load && searchForm.bookName?.value) {
      const fetchData = async () => {
        const booksResolve = await getBooks({
          bookName: searchForm.bookName.value,
          startIndex: isDataFetched.quantity,
          category: searchForm.category.value,
          orderBy: searchForm.orderBy.value,
          options,
        });
        if (typeof booksResolve === "object" && booksResolve.items) {
          dispatch(addBooksToList(booksResolve));
          setIsDataFetched({
            quantity: isDataFetched.quantity + booksResolve.items.length,
            load: false,
          });
          if (!totalBooks) {
            dispatch(setTotalBooksQuantity(booksResolve.totalItems));
          }
          setError("");
          return;
        }
        if (typeof booksResolve === "string") {
          setError(booksResolve as string);
        }
        setIsDataFetched((prevState) => ({
          ...prevState,
          load: false,
        }));
      };
      fetchData();
    }

    return () => abortCtrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDataFetched]);

  return (
    <div className="App">
      <SearchForm
        formData={searchForm}
        setSearchForm={setSearchForm}
        setIsDataFetched={setIsDataFetched}
      />
      <BooksList
        error={error}
        formData={searchForm}
        isDataFetched={isDataFetched}
        setIsDataFetched={setIsDataFetched}
      />
    </div>
  );
}

export default App;
