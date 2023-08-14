import { useState } from "react";
import { Select, Input } from "antd";
import {
  IsDataFetchedType,
  SearchFormKeysType,
  SearchFormType,
} from "../../models/types";
import { useDispatch } from "react-redux";
import { clearBooksList } from "../../store/booksSlice";
import "./styles.scss";

interface ISeacrhFormProps {
  formData: SearchFormType;
  setSearchForm: (arg: SearchFormType) => void;
  setIsDataFetched: (arg: IsDataFetchedType) => void;
}

const SearchForm = ({
  formData,
  setSearchForm,
  setIsDataFetched,
}: ISeacrhFormProps) => {
  const [form, setForm] = useState<SearchFormType>(formData);

  const dispatch = useDispatch();

  const handleFormFieldOnChange = (name: string, value: string) => {
    if (form[name as SearchFormKeysType])
      setForm({ ...form, [name]: { value: value } });
  };

  const handleOnSubmitForm = () => {
    if (!form.bookName.value) return;
    dispatch(clearBooksList());
    setIsDataFetched({
      quantity: 0,
      load: true,
    });
    setSearchForm(form);
  };

  return (
    <form className="search-form">
      <div className="container-small">
        <div className="search-form__title">Search for books</div>
        <div className="search-form__field-search">
          <Input.Search
            name="bookName"
            value={form.bookName.value}
            onChange={({ target }) =>
              handleFormFieldOnChange(target.name, target.value)
            }
            onPressEnter={handleOnSubmitForm}
            onSearch={() => handleOnSubmitForm()}
          />
        </div>
        <div className="search-form__group">
          <div className="search-form__field-wrapper">
            <div className="search-form__field-label">Categories</div>
            <Select
              defaultValue=""
              options={[
                { label: "all", value: "" },
                { label: "art", value: "art" },
                { label: "biorgaphy", value: "biorgaphy" },
                { label: "computers", value: "computers" },
                { label: "history", value: "history" },
                { label: "medical", value: "medical" },
                { label: "poetry", value: "poetry" },
              ]}
              onChange={(label) => handleFormFieldOnChange("category", label)}
            />
          </div>
          <div className="search-form__field-wrapper">
            <div className="search-form__field-label">Sorting by</div>
            <Select
              defaultValue="relevance"
              options={[
                { label: "relevance", value: "relevance" },
                { label: "newest", value: "newest" },
              ]}
              onChange={(label) => handleFormFieldOnChange("orderBy", label)}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
