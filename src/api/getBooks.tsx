import axios from "axios";
import { AbortSignalType, BooksResponseType } from "../models/types";
import { BOOKS_QUANTITY_REQUEST, API_KEY } from "../models/constants";

interface IGetBooksProps {
  bookName: string;
  startIndex: number;
  category?: string;
  orderBy?: string;
  options: AbortSignalType;
}

const getBooks = async ({
  bookName,
  category,
  orderBy,
  startIndex,
  options,
}: IGetBooksProps): Promise<string | BooksResponseType> => {
  try {
    const { data } = await axios.get<BooksResponseType>(
      `https://www.googleapis.com/books/v1/volumes?q="${bookName}"` +
        `${category ? `+subject:${category}` : ""}` +
        `&startIndex=${startIndex}` +
        `&maxResults=${BOOKS_QUANTITY_REQUEST}` +
        `${orderBy ? `&orderBy=${orderBy}` : ""}` +
        `${API_KEY ? `&key=${API_KEY}` : ""}`,
      { signal: options.signal }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      return error.message;
    } else {
      console.log("unexpected error: ", error);
      return "An unexpected error occurred";
    }
  }
};

export default getBooks;
