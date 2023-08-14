import React from "react";

export type ReactElem = React.ReactElement;

export type BooksResponseType = { totalItems: number; items: [] };

export type BookType = {
  accessInfo: object;
  etag: string;
  id: string;
  saleInfo: object;
  searchInfo: object;
  selfLink: string;
  volumeInfo: VolumeInfoType;
};

export type VolumeInfoType = {
  authors: string[];
  categories: string[];
  imageLinks: ImageLinksType;
  title: string;
};

export type ImageLinksType = {
  smallThumbnail: string;
  thumbnail: string;
};

export type IsDataFetchedType = {
  load: boolean;
  quantity: number;
};

export type SearchFormType = {
  [key in SearchFormKeysType]: { value: string };
};

export type SearchFormKeysType = "bookName" | "category" | "orderBy";

export type ReactStateDispatchType<Type> = React.Dispatch<
  React.SetStateAction<Type>
>;

export type AbortSignalType = { signal: AbortSignal };
