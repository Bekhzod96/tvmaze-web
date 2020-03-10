import React from 'react';
import './FourColGrid.css';

const FourColGrid = ({ header, loading, children }) => {

  const renderElements = () => {
    const gridElements = children.map((element, i) => (
      <div key={i} className="twm-grid-element">
        {element}
      </div>
    ))
    return gridElements;
  }

  return (
    <div className="twm-grid">
      {header && !loading ? <h1>{header}</h1> : null}
      <div className="twm-grid-content">
        {renderElements()}
      </div>
    </div>
  )
}

export default FourColGrid;