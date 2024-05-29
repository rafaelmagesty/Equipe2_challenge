import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ min, max, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onChange(newValue);

    const percentage = ((newValue - min) / (max - min)) * 100;
    event.target.style.background = `linear-gradient(to right, rgb(139, 240, 177) ${percentage}%, #17171d ${percentage}%)`;
  };

  return (
    <div className="slidecontainer">
      <input
        type="range"
        min={min}
        max={max}
        value={sliderValue}
        className="slider"
        onChange={handleSliderChange}
      />
      
    </div>
  );
};

export default Slider;
