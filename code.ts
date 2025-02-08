figma.showUI(__html__);

figma.ui.onmessage = (msg) => {
  if (msg.type === "create-shapes") {
    const { count, width, height, shapeType } = msg;

    // Array to hold all generated shapes
    const shapes: SceneNode[] = [];

    for (let i = 0; i < count; i++) {
      let shape;

      if (shapeType === "mixed") {
        // Randomly choose a shape type
        shape = createRandomShape();
      } else {
        // Create the selected shape type
        switch (shapeType) {
          case "circle":
            shape = figma.createEllipse(); // Circle
            break;
          case "square":
            shape = figma.createRectangle(); // Square
            break;
          case "star":
            shape = createStar(); // Star
            break;
          case "polygon":
            shape = createPolygon(); // Polygon
            break;
          default:
            shape = figma.createEllipse(); // Default to circle
        }
      }

      // Set random position
      shape.x = Math.random() * width;
      shape.y = Math.random() * height;

      // Resize the shape if it supports resizing
      if ("resize" in shape) {
        shape.resize(5 + Math.random() * 10, 5 + Math.random() * 10);
      }

      // Add random color if it supports fills
      if ("fills" in shape) {
        shape.fills = [getRandomColor()];
      }

      // Add the shape to the array
      shapes.push(shape);
    }

    // Only group if there are shapes to group
    if (shapes.length > 0) {
      figma.group(shapes, figma.currentPage); // No need to assign to a variable
      figma.notify(`Generated ${count} shapes and grouped them!`);
    } else {
      figma.notify("No shapes were generated.");
    }
  }

  // Close the plugin after execution
  figma.closePlugin();
};

function createRandomShape(): SceneNode {
  const shapeType = Math.floor(Math.random() * 4); // Randomly choose a shape type

  switch (shapeType) {
    case 0:
      return figma.createEllipse(); // Circle
    case 1:
      return figma.createRectangle(); // Square
    case 2:
      return createStar(); // Star
    case 3:
      return createPolygon(); // Polygon
    default:
      return figma.createEllipse();
  }
}

function createStar(): StarNode {
  const star = figma.createStar();
  star.pointCount = 5; // Default star has 5 points
  star.innerRadius = 0.5; // Adjust inner radius for a star-like shape
  return star;
}

function createPolygon(): PolygonNode {
  const polygon = figma.createPolygon();
  polygon.pointCount = 6; // Default polygon has 6 sides
  return polygon;
}

function getRandomColor(): SolidPaint {
  const r = Math.random();
  const g = Math.random();
  const b = Math.random();
  return {
    type: "SOLID", // Explicitly set the type to "SOLID"
    color: { r, g, b }, // Define the RGB color values
  };
}