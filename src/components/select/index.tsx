import React, { useState } from "react";
import { Filters } from "../../interfaces/filters";

interface selectProps {
  filters: Filters[];
  placeholder: string;
  onChange: (filters: Filters) => void;
}

const Select = ({ filters, placeholder, onChange }: selectProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  const handleSelectClick = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="selectbox" onClick={handleSelectClick}>
        <div className="select">
          <div className="placeholder">{placeholder}</div>
        </div>

        <div className={`options ${visible ? "active" : ""}`}>
          {filters.map((item, idx) => {
            return (
              <div key={idx} className="option">
                <div
                  className="option-content"
                  data-value={item.value}
                  onClick={() => onChange(item)}
                >
                  <img src={item.logo} alt={item.name} />
                  <div className="option-title">{item.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Select;
