import React ,{ useState } from 'react'

const getColor = (value) => {

    const intensity = value / 100; // Assuming values are 0-100
    const hue = 120; // Green
    const saturation = 100;
    const lightness = 100 - (intensity * 50);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};



const HeatMap = ({ data }) => {
    const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
     const handleMouseEnter = (value, event) => {
    setTooltip({
      visible: true,
      content: `Value: ${value}`,
      x: event.clientX + 10, // Offset from cursor
      y: event.clientY + 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }
   
  return (

    <div style={{ position: 'relative' }}>
      {/* Tooltip Element */}
      {tooltip.visible && (
        <div
          style={{
            position: 'fixed',
            top: tooltip.y,
            left: tooltip.x,
            background: 'black',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            pointerEvents: 'none', 
          }}
        >
          {tooltip.content}
        </div>
        
        )}
{/* Heat Map Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${data[0].length}, 30px)`, // Dynamic columns
          gap: '2px',
        }}
      >
        {data.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: getColor(value),
                border: '1px solid #eee',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => handleMouseEnter(value, e)}
              onMouseLeave={handleMouseLeave}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HeatMap;
