import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ReactElem } from "../../models/types";
import "./styles.scss";

const BooksGrid = () => {
  const { books } = useSelector((state: RootState) => state.booksSlice);
  const newCards = books?.map(({ volumeInfo }, index): ReactElem => {
    return (
      <div key={`books-grid-card-${index}`} className="books-grid__card">
        <div className="books-grid__card-img">
          <img src={volumeInfo.imageLinks?.thumbnail} alt="Book thumbnail" />
        </div>
        {volumeInfo.categories ? (
          <div className="books-grid__card-category">
            {volumeInfo.categories[0]}
          </div>
        ) : (
          ""
        )}
        {volumeInfo.title ? (
          <div className="books-grid__card-title">{volumeInfo.title}</div>
        ) : (
          ""
        )}
        {volumeInfo.authors ? (
          <div className="books-grid__card-authors">
            {volumeInfo.authors.map((author, index) => (
              <div key={`book-author-${author}-${index}`}>
                {index !== volumeInfo.authors.length - 1
                  ? `${author}, `
                  : `${author}`}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  });
  return <div className="books-grid">{newCards}</div>;
};

export default BooksGrid;
