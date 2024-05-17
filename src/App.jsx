import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import './App.css';
import 'react-resizable/css/styles.css';

const App = () => {
  const [dimensions, setDimensions] = useState({
    window1: { width: 300, height: 300 },
    window2: { width: 300, height: 300 },
    window3: { width: 600, height: 300 },
  });

  const handleResize = (key, size) => {
    setDimensions((prevDimensions) => {
      const updatedDimensions = { ...prevDimensions, [key]: size };

      if (key === 'window1' || key === 'window2') {
        const remainingWidth = window.innerWidth - updatedDimensions[key].width - 30;
        const otherKey = key === 'window1' ? 'window2' : 'window1';
        updatedDimensions[otherKey].width = remainingWidth;
      }

      if (key === 'window3') {
        const remainingHeight = window.innerHeight - updatedDimensions[key].height - 30;
        updatedDimensions.window1.height = remainingHeight / 2;
        updatedDimensions.window2.height = remainingHeight / 2;
      }

      return updatedDimensions;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <ResizableBox
          width={dimensions.window1.width}
          height={dimensions.window1.height}
          minConstraints={[100, 100]}
          onResizeStop={(e, data) => handleResize('window1', { width: data.size.width, height: data.size.height })}
          handle={<span className="custom-handle custom-handle-se" />}
        >
          <div className="box">
            <p>Component 1</p>
          </div>
        </ResizableBox>
        <ResizableBox
          width={dimensions.window2.width}
          height={dimensions.window2.height}
          minConstraints={[100, 100]}
          onResizeStop={(e, data) => handleResize('window2', { width: data.size.width, height: data.size.height })}
          handle={<span className="custom-handle custom-handle-se" />}
        >
          <div className="box">
            <p>Component 2</p>
          </div>
        </ResizableBox>
      </div>
      <div className="row">
        <ResizableBox
          width={dimensions.window3.width}
          height={dimensions.window3.height}
          minConstraints={[100, 100]}
          onResizeStop={(e, data) => handleResize('window3', { width: data.size.width, height: data.size.height })}
          handle={<span className="custom-handle custom-handle-se" />}
        >
          <div className="box">
            <p>Component 3</p>
          </div>
        </ResizableBox>
      </div>
    </div>
  );
};

export default App;
