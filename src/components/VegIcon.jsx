import React from 'react';

const VegIcon = ({ isVeg }) => (
  <span
    title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
    className={`inline-block w-3 h-3 rounded-full mr-1 ${isVeg ? 'bg-green-600' : 'bg-red-600'}`}
  />
);

export default VegIcon;
