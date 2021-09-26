import React from "react";
import { IDropdownProps } from "./interface";
import "./styles.css";
import openSVG from "../../img/open.svg";
import SearchInput from "../searchInput/searchInput";
import SelectedOption from "../selectedOption/selectedOption";

export class Dropdown extends React.Component<IDropdownProps, any> {
	toggleRef = React.createRef<HTMLDivElement>();
	listRef = React.createRef<HTMLDivElement>();

	constructor(props: IDropdownProps) {
		super(props);
		this.state = {
			inputValue: "",
			options: props.options,
			selectedOptions: [],
			filteredOptions: props.options,
			toggleOptionsList: false,
		};

		this.toggleOptionList = this.toggleOptionList.bind(this);
		this.renderSelectedList = this.renderSelectedList.bind(this);
		this.renderOptionList = this.renderOptionList.bind(this);
		this.setOption = this.setOption.bind(this);
		this.isCheckedOption = this.isCheckedOption.bind(this);
		this.onDeleteOption = this.onDeleteOption.bind(this);
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.matchValues = this.matchValues.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.toggleClickEventListener = this.toggleClickEventListener.bind(this);
	}

	componentDidUpdate() {
		this.toggleClickEventListener();
	}
	componentWillUnmount() {
		this.toggleClickEventListener();
	}

	toggleClickEventListener() {
		if (this.state.toggleOptionsList)
			document.addEventListener("click", this.handleClickOutside);
		else document.removeEventListener("click", this.handleClickOutside);
	}

	handleClickOutside(event: any) {
		return (
			!(this.listRef.current?.contains(event.target) ||
				this.toggleRef.current?.contains(event.target))
			&& this.setState({ toggleOptionsList: !this.state.toggleOptionsList })
		);
	}

	handleSearchChange(value: string) {
		this.filterOptionsByInput(value);
		this.setState({ inputValue: value });
	}

	filterOptionsByInput(value: string) {
		const { filteredOptions } = this.state;
		this.setState({
			options: filteredOptions.filter(
				(i: any) => this.matchValues(i.value, value) > -1
			),
		});
	}

	matchValues(value: string, search: string) {
		return value.toLowerCase().indexOf(search.toLowerCase());
	}

	toggleOptionList(e: any) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			toggleOptionsList: !this.state.toggleOptionsList,
		});
	}

	onDeleteOption(option: any) {
		this.setState({
			selectedOptions: this.state.selectedOptions.filter(
				(item: any) => item !== option
			),
		});
	}

	isCheckedOption(option: any) {
		return this.state.selectedOptions.find((item: any) => item.value === option.value);
	}

	setOption(option: any) {
		const { selectedOptions } = this.state;
		let newSelected;
		if (this.props.multiselect) {
			if (this.isCheckedOption(option)){
				newSelected = selectedOptions.filter((item: any) => item !== option);
			}
			else
				newSelected = [...selectedOptions, option];

			this.setState({
				selectedOptions: newSelected,
			})
		}

		else {
			this.setState({ selectedOptions: selectedOptions[0] === option ? [] : [option] });
		}
	}

	renderSelectedList() {
		return (
			<ul className={`selectedOptions`} tabIndex={1}>
				{this.state.selectedOptions.length > 0 ? (
					this.state.selectedOptions.map((option: any) =>
						<SelectedOption
						key={this.props.options.indexOf(this.props.options.find((item:any)=>item.value===option.value))}
						option={option}
						deleteOptionHandler={this.onDeleteOption}
						/>
					)) : (
					<span className="selectedOptionsPlaceholder">
						{this.props.dropdownPlaceholder}
					</span>
				)}
			</ul>
		);
	}

	renderOptionList() {
		const { showIcon } = this.props;
		return (
			<ul>
				{this.state.options.map((option: any, i: number) =>{
					return (<li
						key={this.props.options.indexOf(this.props.options.find((item:any)=>item.value===option.value))}
						className={`option`}
						onClick={() => this.setOption(option)}
					>
						{showIcon &&
							<img
								className={`option-icon`}
								src={option.icon}
								alt="option img" />
						}
						<span
							className={`option-name`}>{option.value}</span>
						<span className={`checkbox-container`}>
							<input
								type="checkbox"
								checked={this.isCheckedOption(option) ? true : false}
								className={`option-checkbox`}
								onChange={() => this.setOption(option)}
							/>
							<span className={`customCheckBox`}></span>
						</span>
					</li>
					)	})}
			</ul>);
	}

	render() {
		const { dropdownName, isSearchable } = this.props;

		return (
			<div
			className={`dropdown-wrapper`}>

				<span className={`dropdown-name`}>{dropdownName}</span>

				<div
					className={`selectedOptions-container`}
					onClick={(e: any) => this.toggleOptionList(e)}
					ref={this.toggleRef}
				>
					{this.renderSelectedList()}

					<img
						className={`dropdown-icon ${this.state.toggleOptionsList ? "dropdown-icon-open" : ""}`}
						src={openSVG}
						alt="{Icon}"
					></img>

				</div>

				<div
					ref={this.listRef}
					className={`dropdown-list ${this.state.toggleOptionsList ? "dropdown-list-open" : ""}`}>

					{isSearchable && <SearchInput filterOptionsByInput={this.handleSearchChange} />}

					{this.renderOptionList()}
				</div>
			</div>
		);
	}
}
