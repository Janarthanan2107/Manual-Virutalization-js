import React, { useState, useEffect } from "react";
import VirtualizedEditableTable from "./VirtualizedList";

export default function App() {
  const rows = Array.from({ length: 1000 }, (_, rowIndex) =>
    Array.from(
      { length: 5 },
      (_, columnIndex) => `Row ${rowIndex + 1} Col ${columnIndex + 1}`
    )
  );

  const [containerHeight, setContainerHeight] = useState(
    window.innerHeight * 0.9666
  );

  useEffect(() => {
    // Function to update height on window resize
    const handleResize = () => {
      setContainerHeight(window.innerHeight * 0.9666); // Set container height to 80% of window height
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="App">
      <VirtualizedEditableTable
        rows={rows}
        columns={5}
        rowHeight={40}
        containerHeight={containerHeight} // Pass dynamic height
      />
    </div>
  );
}
