import React from 'react';

function DisplayPreview({ text }) {
  const maxLength = 67;
  const trimmedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;

  return <div style={{fontSize: "11px", color: "#000000c7",}}>{trimmedText}</div>;
}

export default DisplayPreview;