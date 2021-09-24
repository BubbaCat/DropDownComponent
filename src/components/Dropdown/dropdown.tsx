import React from "react";
import { IDropdownProps } from "./interface";
import "./styles.css";
import closeSVG from "../../img/close.svg";
import openSVG from "../../img/open.svg";
//TODO: Сделать все компонтенты контролируемыми
//TODO: Доверстать лупу и чекбокс
//TODO: Контроль с клавиатуры и клик вне окна
//TODO: Отрефакторить код, разбить на компоненты
//TODO: НАПИСАТЬ ТЕСТЫ

export class Dropdown extends React.Component<IDropdownProps, any> {

	constructor(props: IDropdownProps) {
		super(props);
		this.state = {
			inputValue: "",
			options: props.options,
			selectedOptions: [],
			filteredOptions: props.options,
			toggleOptionsList: false
		};

		this.toggleOptionList = this.toggleOptionList.bind(this);
		this.renderSelectedList = this.renderSelectedList.bind(this);
		this.renderOptionList = this.renderOptionList.bind(this);
		this.setOption = this.setOption.bind(this);
		this.isCheckedOption = this.isCheckedOption.bind(this);
		this.onDeleteOption = this.onDeleteOption.bind(this);
		this.filterOptionsByInput = this.filterOptionsByInput.bind(this);
		this.matchValues = this.matchValues.bind(this);
		this.setInitialState = this.setInitialState.bind(this);

	}
	setInitialState() {
	}

	componentDidMount() {
		console.log("mounting")
	}

	filterOptionsByInput(event: any) {
		let { options, filteredOptions } = this.state;
		options = filteredOptions.filter((i: any) => this.matchValues(i.value, event.target.value) > -1)
		this.setState({ options, inputValue: event.target.value });
	}

	matchValues(value: string, search: string) {
		return value.toLowerCase().indexOf(search.toLowerCase());
	}

	renderSelectedList() {
		return (<ul
			className={`selectedOptions`}
			tabIndex={1}>
			{this.state.selectedOptions.length > 0 ?
				(this.state.selectedOptions.map((option: any, i: number) => {
					return (<div
						key={`selected${i}`}
						className="selectedOption"
						tabIndex={2}>
						<span
							className="selectedOption-name">{option.value}</span>
						<img
							className="unselectOption"
							alt="close"
							src={closeSVG}
							onClick={(e) => this.onDeleteOption(e, option)}></img>
					</div>)
				})
				)
				:
				(
					<span className="selectedOptionsPlaceholder">
						{this.props.dropdownPlaceholder}
					</span>
				)
			}
		</ul>);
	}

	toggleOptionList() {
		this.setState({
			toggleOptionsList: !this.state.toggleOptionsList,
		});
	}

	onDeleteOption(e: any, option: any) {
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			selectedOptions: this.state.selectedOptions.filter((item: any) => item !== option)
		})
		return false;
	}

	setOption(option: any) {
		const { selectedOptions } = this.state;
		let newSelected;
		if (this.props.multiselect) {
			if (this.isCheckedOption(option))
				newSelected = selectedOptions.filter((item: any) => item !== option);
			else
				newSelected = [...selectedOptions, option];

			this.setState({
				selectedOptions: newSelected
			})
		}
		else {
			this.setState({selectedOptions: selectedOptions[0]===option ? [] : [option]});
		}
	}

	isCheckedOption(option: any) {
		return this.state.selectedOptions.find((item: any) => item === option);
	}
	renderOptionList() {
		const { showIcon } = this.props;
		return (
			<ul>
				{this.state.options.map((option: any, i: number) => (
					<li key={`option${i}`}
						className={`option`}
						onClick={() => this.setOption(option)}
					>
						<img
							className={`option-icon ${showIcon ? "option-icon-show" : ""}`}
							src={option.icon}
							alt="option img"
						></img>
						<span
							className={`option-name`}>{option.value}</span>
						<input
							type="checkbox"
							checked={this.isCheckedOption(option)}
							className={`option-checkbox`} />
					</li>
				))}
			</ul>);
	}



	render() {
		const { dropdownName, isSearchable } = this.props;
		return (
			<div className={`dropdown-wrapper`}>
				<span className={`dropdown-name`}>{dropdownName}</span>
				<div
					className={`selectedOptions-container`}
					onClick={this.toggleOptionList}>
					{this.renderSelectedList()}
					<img
						className={`dropdown-icon ${this.state.toggleOptionsList ? "dropdown-icon-open" : ""}`}
						src={openSVG}
						alt="{Icon}"
					></img>
				</div>
				<div className={`dropdown-list ${this.state.toggleOptionsList ? "dropdown-list-open" : ""}`}>
					{isSearchable &&
						<input
							onChange={(e: any) => this.filterOptionsByInput(e)}
							value={this.state.inputValue}
							type="search"
							placeholder="Поиск"
							className={`dropdown-search`}
						/>
					}
					{this.renderOptionList()}
				</div>
			</div>
		);
	}
}
