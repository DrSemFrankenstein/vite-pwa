import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Modal, Input, Button as AntdButton } from "antd"; // Importing Ant Design Modal
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const PageBuilder = () => {
  const [layout, setLayout] = useState([]);
  const [layouts, setLayouts] = useState({
    lg: [],
    md: [],
    sm: [],
    xs: [],
    xxs: [],
  });
  const [components, setComponents] = useState([]);
  const [nextPosition, setNextPosition] = useState({ x: 0, y: 0 });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // Track mode
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const handleAddComponent = (type) => {
    const newComponent = {
      id: Math.random().toString(36).substring(2, 15),
      type,
      settings: {
        text: "Click to edit",
        src: "",
        link: "",
        backgroundColor: "#ffffff",
      },
      x: nextPosition.x,
      y: nextPosition.y,
      w: 4,
      h: 4,
      static: false,
    };

    const newX = (nextPosition.x + 4) % 12;
    const newY = newX === 0 ? nextPosition.y + 5 : nextPosition.y;
    setNextPosition({ x: newX, y: newY });

    setComponents([...components, newComponent]);
  };

  //   const handleLayoutChange = (newLayout) => {
  //     setLayout(newLayout);
  //     const updatedComponents = components.map((comp) => {
  //       const layoutItem = newLayout.find((item) => item.i === comp.id);
  //       return layoutItem ? { ...comp, ...layoutItem } : comp;
  //     });
  //     setComponents(updatedComponents);
  //   };

  const handleLayoutChange = (newLayout, allLayouts) => {
    console.log("New Layout:", newLayout);
    console.log("All Layouts:", allLayouts);
    // Update layout state
    setLayout(newLayout);
    setLayouts(allLayouts);

    // Update components
    setComponents((prevComponents) =>
      prevComponents.map((comp) => {
        const layoutItem = newLayout.find((item) => item.i === comp.id);
        return layoutItem
          ? {
              ...comp,
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h,
            }
          : comp;
      })
    );
  };

  const handleBreakpointChange = (newBreakpoint) => {
    // Optionally reset layout if needed when switching back to a larger breakpoint
    if (newBreakpoint === "lg") {
      // Reset layout when returning to large screen
      setLayout(layouts.lg || []);
    }
  };

  const handleComponentClick = (component) => {
    if (isEditMode) {
      setSelectedComponent(component);
      setIsModalOpen(true); // Open modal
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedComponent((prev) => ({
      ...prev,
      settings: { ...prev.settings, [name]: value },
    }));
  };

  const handleSaveChanges = () => {
    setComponents((prevComponents) =>
      prevComponents.map((comp) =>
        comp.id === selectedComponent.id ? selectedComponent : comp
      )
    );
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  const exportPageData = () => {
    const pageData = {
      selectedComponents: components,
      layout,
      // Add any additional page settings if needed
    };
    console.log("Exported Data:", JSON.stringify(pageData));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <AntdButton onClick={() => handleAddComponent("Image")}>
            Add Image
          </AntdButton>
          <AntdButton onClick={() => handleAddComponent("Text")}>
            Add Text
          </AntdButton>
          <AntdButton onClick={() => handleAddComponent("Button")}>
            Add Button
          </AntdButton>
          <AntdButton onClick={() => handleAddComponent("Html")}>
            Add HTML
          </AntdButton>
          <button onClick={exportPageData}>Export Data</button>
          <AntdButton onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? "Switch to Drag Mode" : "Switch to Edit Mode"}
          </AntdButton>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          onLayoutChange={handleLayoutChange}
          onBreakpointChange={handleBreakpointChange}
          rowHeight={30}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          preventCollision={true}
          isDraggable={!isEditMode}
          isResizable={!isEditMode}
          compactType={null}
        >
          {components.map((component) => (
            <div
              key={component.id}
              data-grid={{ ...component, i: component.id }}
              onClick={() => handleComponentClick(component)}
              style={{
                overflow: "hidden",
                backgroundColor: component.settings.backgroundColor,
                cursor: isEditMode ? "pointer" : "move",
              }}
            >
              {component.type === "Image" && (
                <img
                  src={
                    component.settings.src || "https://via.placeholder.com/150"
                  }
                  alt="User Component"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              )}
              {component.type === "Text" && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: component.settings.text || "Sample Text",
                  }}
                />
              )}
              {component.type === "Button" && (
                <button style={{ width: "100%", height: "100%" }}>
                  {component.settings.text || "Click Me"}
                </button>
              )}
              {/* Handle other component types similarly */}
            </div>
          ))}
        </ResponsiveGridLayout>

        {selectedComponent && (
          <Modal
            title={`Edit ${selectedComponent.type}`}
            visible={isModalOpen}
            onOk={handleSaveChanges}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedComponent(null);
            }}
          >
            {selectedComponent.type === "Image" && (
              <div>
                <label>
                  Image URL:
                  <Input
                    type="text"
                    name="src"
                    value={selectedComponent.settings.src || ""}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}
            {selectedComponent.type === "Text" && (
              <div>
                <label>
                  Text Content:
                  <Input.TextArea
                    name="text"
                    value={selectedComponent.settings.text || ""}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}
            {selectedComponent.type === "Button" && (
              <div>
                <label>
                  Button Text:
                  <Input
                    type="text"
                    name="text"
                    value={selectedComponent.settings.text || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Button Link:
                  <Input
                    type="text"
                    name="link"
                    value={selectedComponent.settings.link || ""}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            )}
            <label>
              Background Color:
              <Input
                type="color"
                name="backgroundColor"
                value={selectedComponent.settings.backgroundColor || "#ffffff"}
                onChange={handleInputChange}
              />
            </label>
          </Modal>
        )}
      </div>
    </DndProvider>
  );
};

export default PageBuilder;