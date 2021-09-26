import React from "react";
import "./styles.css";
import closeSVG from "../../img/close.svg";

const SelectedOption = (props:any) => {
	
	function handleClickOption(event: any) {	
		event.preventDefault();
		event.stopPropagation();
		props.deleteOptionHandler(props.option);
	}

  return (
	<li
	className="selectedOption"
	tabIndex={2}
	onClick={(e: any) => e.stopPropagation()}>
	<span
		className="selectedOption-name">{props.option.value}</span>
	<img
		className="unselectOption"
		alt="close"
		src={closeSVG}
		onClick={(e) => handleClickOption(e)}
	></img>
</li>
  );
};

export default SelectedOption;
