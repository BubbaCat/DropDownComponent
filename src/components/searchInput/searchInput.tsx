import React from "react";
import "./styles.css";

const SearchInput = (props:any) => {
	const [value,setValue] = React.useState("");
	
	function handleSearchChange(event: any) {	
		const value = event.target.value.trimLeft();
		props.filterOptionsByInput(value);
		setValue(value);
	}

  return (
    <span className={`search-container`}>
      <input
        onChange={(e: any) => handleSearchChange(e)}
        value={value}
        type="search"
        placeholder="Поиск"
        className={`dropdown-search`}
      />
    </span>
  );
};

export default SearchInput;
