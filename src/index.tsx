import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Dropdown } from './components/dropdown/dropdown';
import russiaSVG from "./img/russia.svg";
import germanySVG from "./img/germany.svg";
import engSVG from "./img/eng.svg";
import polandSVG from "./img/poland.svg";
import spainSVG from "./img/spain.svg";
import italySVG from "./img/italy.svg";
import { IOption } from './components/dropdown/interface';

const options:Array<IOption> = [
  {value: "Русский",icon:russiaSVG,checked:false},
  {value: "Английский",icon:engSVG,checked:false},
  {value: "Испанский",icon:spainSVG,checked:false},
  {value: "Итальянский",icon:italySVG,checked:false},
  {value: "Польский",icon: polandSVG,checked:false},
  {value: "Немецкий",icon:germanySVG,checked:false},
];


ReactDOM.render(
  <React.StrictMode>
    <div className="Main">
      <Dropdown options={options} multiselect isSearchable showIcon dropdownName="Язык" dropdownPlaceholder="Выберите язык из списка"/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);