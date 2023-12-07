import { useState } from 'react';
import './select.css';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
        
const Select = ({ options, onSelect, InitialValue, disabled }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const handleToggleDropdown = () => {
      if(disabled===false){
        setIsDropdownOpen(!isDropdownOpen);
      }
      
    };
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsDropdownOpen(false);
      onSelect(option);
    };
    return (
        <div className="select-container">
          <div className={`flex ${selectedOption ? "active" : "selected-option"} ${disabled ? "disabled" : ""}`} onClick={handleToggleDropdown}>
            <h4>{selectedOption ? selectedOption.label : InitialValue }</h4> {!isDropdownOpen ? <IoIosArrowDown className='select-icon'/> : <IoIosArrowUp className='select-icon'/>}
          </div>
          {isDropdownOpen && (
            <div className="dropdown-menu">
                {options.map((option,index) => (
                <div
                    key={index}
                    className="dropdown-option"
                    onClick={() => handleOptionClick(option)}
                >
                    {option.label}
                </div>
                ))}
            </div>
            )}
      </div>
    );
};
export default Select;