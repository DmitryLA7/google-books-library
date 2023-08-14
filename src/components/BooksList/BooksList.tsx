import { Button } from "antd";
import BooksGrid from "../BooksGrid";
import {
  IsDataFetchedType,
  ReactStateDispatchType,
  SearchFormType,
} from "../../models/types";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./styles.scss";

interface IBooksListProps {
  formData: SearchFormType;
  isDataFetched: IsDataFetchedType;
  setIsDataFetched: ReactStateDispatchType<IsDataFetchedType>;
  error?: string;
}

const BooksList = ({
  formData,
  isDataFetched,
  setIsDataFetched,
  error,
}: IBooksListProps) => {
  const totalBooks = useSelector(
    (state: RootState) => state.booksSlice.totalBooks
  );

  const handleLoadMoreOnClick = () => {
    setIsDataFetched((prevState) => ({
      ...prevState,
      load: true,
    }));
  };

  return (
    <div className="books-list">
      <div className="container">
        {error && <div className="books-list__error">{error}</div>}
        <div className="books-list__total">
          {!isDataFetched.load && (
            <>
              {formData.bookName.value ? (
                <div>
                  {totalBooks
                    ? `Found ${totalBooks} results`
                    : `Nothing found :(`}
                </div>
              ) : (
                <div>
                  {totalBooks === 0 &&
                    !formData.bookName.value &&
                    "Search field can't be empty"}
                </div>
              )}
            </>
          )}
        </div>
        <BooksGrid />
        {isDataFetched.load && <Loader />}
        {!!totalBooks && !(isDataFetched.quantity >= totalBooks) && (
          <div className="books-list__load-more">
            <Button
              disabled={isDataFetched.load}
              onClick={handleLoadMoreOnClick}
            >
              Load more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksList;
