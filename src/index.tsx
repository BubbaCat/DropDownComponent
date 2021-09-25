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

const options = [
  {value: "Русский",icon:russiaSVG},
  {value: "Английский",icon:engSVG},
  {value: "Испанский",icon:spainSVG},
  {value: "Итальянский",icon:italySVG},
  {value: "Польский",icon: polandSVG },
  {value: "Немецкий",icon:germanySVG},
];


ReactDOM.render(
  <React.StrictMode>
    <div className="Main">
      <Dropdown options={options} multiselect isSearchable showIcon dropdownName="Язык" dropdownPlaceholder="Выберите язык из списка"/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);