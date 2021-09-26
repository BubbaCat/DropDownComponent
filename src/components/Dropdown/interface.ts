export interface IDropdownProps {
	options: any,
	dropdownName:string,
	dropdownPlaceholder:string,
	multiselect?:boolean,
	showIcon?:boolean,
	isSearchable?:boolean,
}

export interface IDropdownState {
	inputValue: string,
	options: Array<IDropdownProps>,
	selectedOptions: Array<IDropdownProps>,
	filteredOptions: Array<IDropdownProps>,
	toggleOptionsList: boolean,
}

export interface IOption{
	value:string,
	icon:string,
	checked:boolean
}