import React, { useState, useRef, useEffect } from "react";

const VirtualizedEditableTable = ({
  rows,
  columns,
  rowHeight,
  containerHeight,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [data, setData] = useState(rows); // State to manage table data
  const containerRef = useRef(null);

  // Calculate how many rows are visible based on container height
  const totalVisibleRows = Math.ceil(containerHeight / rowHeight);

  // Calculate the range of rows to render based on scroll position
  const startIndex = Math.floor(scrollPosition / rowHeight);
  const endIndex = startIndex + totalVisibleRows;

  // Get only the rows in the visible range
  const visibleRows = data?.slice(startIndex, endIndex + 1);

  // Update scroll position when user scrolls
  const handleScroll = () => {
    setScrollPosition(containerRef.current.scrollTop);
  };

  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle editing cells
  const handleCellChange = (rowIndex, columnIndex, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnIndex] = value; // Update cell value
    setData(updatedData); // Update table data
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: `${containerHeight}px`,
        overflowY: "auto",
        position: "relative",
        border: "1px solid #ddd",
      }}
    >
      <div
        style={{
          height: `${data.length * rowHeight}px`,
          position: "relative",
        }}
      >
        {visibleRows.map((row, rowIndex) => (
          <div
            key={startIndex + rowIndex}
            style={{
              display: "flex",
              position: "absolute",
              top: `${(startIndex + rowIndex) * rowHeight}px`,
              height: `${rowHeight}px`,
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {row.map((cell, columnIndex) => (
              <input
                key={columnIndex}
                value={cell}
                onChange={(e) =>
                  handleCellChange(
                    startIndex + rowIndex,
                    columnIndex,
                    e.target.value
                  )
                }
                style={{
                  flex: 1,
                  padding: "5px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedEditableTable;
