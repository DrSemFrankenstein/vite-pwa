import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Responsive, WidthProvider } from "react-grid-layout";
import {
  Modal,
  Input,
  Button as AntdButton,
  Upload,
  Button,
  Radio,
  FloatButton,
} from "antd";
import {
  DeleteOutlined,
  ExportOutlined,
  AppstoreAddOutlined,
  HolderOutlined,
  EditOutlined,
  DragOutlined,
  PlusOutlined,
} from "@ant-design/icons"; // Importing icons
import { useDispatch } from "react-redux"; // Assuming you use Redux for state management
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const IFrameBuilder = () => {
  const dispatch = useDispatch();
  const [layout, setLayout] = useState([]);
  const [components, setComponents] = useState([]);
  const [nextPosition, setNextPosition] = useState({ x: 0, y: 0 });
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true); // Track mode
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const savedPageData = localStorage.getItem("pageData");
    if (savedPageData) {
      const { selectedComponents, layout } = JSON.parse(savedPageData);
      setComponents(selectedComponents);
      setLayout(layout);

      // Set nextPosition based on the last component's position
      const lastComponent = selectedComponents[selectedComponents.length - 1];
      if (lastComponent) {
        setNextPosition({
          x: lastComponent.x + lastComponent.w,
          y: lastComponent.y,
        });
      }
    }
  }, []);

  const handleAddComponent = () => {
    const newComponent = {
      id: Math.random().toString(36).substring(2, 15),
      type: "Iframe",
      settings: {
        src: "https://www.example.com", // Default iframe URL
        width: "100%",
        height: "100%",
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

  const handleAddButtonComponent = () => {
    const newComponent = {
      id: Math.random().toString(36).substring(2, 15),
      type: "Button",
      settings: {
        linkType: "url", // default type is URL
        value: "https://www.example.com", // default URL or phone number
        image: "", // optional image for the button
      },
      x: nextPosition.x,
      y: nextPosition.y,
      w: 2,
      h: 2,
      static: false,
    };

    const newX = (nextPosition.x + 2) % 12;
    const newY = newX === 0 ? nextPosition.y + 5 : nextPosition.y;
    setNextPosition({ x: newX, y: newY });

    setComponents([...components, newComponent]);
  };

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedComponent((prev) => ({
          ...prev,
          settings: { ...prev.settings, image: reader.result },
        }));
      };
      reader.readAsDataURL(file);
    }
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

  const handleDeleteComponent = () => {
    setComponents((prevComponents) =>
      prevComponents.filter((comp) => comp.id !== selectedComponent.id)
    );
    setIsModalOpen(false);
    setSelectedComponent(null);
  };

  const handleDeleteAllComponents = () => {
    setComponents([]); // Remove all components
    setLayout([]); // Clear layout
    setNextPosition({ x: 0, y: 0 }); // Reset the next position

    // Clear data from localStorage
    localStorage.removeItem("pageData");
  };

  const exportPageData = () => {
    const pageData = {
      selectedComponents: components,
      layout,
    };
    console.log("Exported Data:", JSON.stringify(pageData));

    // Save data to localStorage
    localStorage.setItem("pageData", JSON.stringify(pageData));

    // Optionally, save to Redux as well
    dispatch({
      type: "SAVE_LAYOUT",
      payload: {
        layout: pageData.layout,
        components: pageData.selectedComponents,
      },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ marginBottom: "1rem" }}>
          {/* <AntdButton
            onClick={handleAddComponent}
            icon={<AppstoreAddOutlined />}
            style={{ marginRight: "1rem" }}
          >
            Add Iframe
          </AntdButton>

          <AntdButton
            onClick={handleAddButtonComponent}
            icon={<AppstoreAddOutlined />}
            style={{ marginRight: "1rem" }}
          >
            Add Button
          </AntdButton>

          <AntdButton
            onClick={exportPageData}
            icon={<ExportOutlined />}
            style={{ marginRight: "1rem" }}
          >
            Export Data
          </AntdButton> */}

          <Radio.Group
            value={isEditMode ? "edit" : "drag"} // Controlled value
            onChange={(e) => setIsEditMode(e.target.value === "edit")} // Update isEditMode
            style={{ marginRight: "1rem" }}
            buttonStyle="solid" // For a filled style
          >
            <Radio.Button value="edit">
              <EditOutlined style={{ marginRight: "8px" }} />
              Edit Mode
            </Radio.Button>
            <Radio.Button value="drag">
              <DragOutlined style={{ marginRight: "8px" }} />
              Drag Mode
            </Radio.Button>
          </Radio.Group>

          {/* <AntdButton
            onClick={handleDeleteAllComponents}
            icon={<DeleteOutlined />}
            danger
          >
            Delete All
          </AntdButton> */}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <FloatButton.Group
            shape="circle"
            trigger="click"
            type="primary"
            style={{ right: 24, bottom: 24 }}
            icon={<PlusOutlined />}
          >
            <FloatButton
              onClick={handleAddComponent}
              icon={<AppstoreAddOutlined />}
              tooltip="Add Iframe"
            />
            <FloatButton
              onClick={handleAddButtonComponent}
              icon={<AppstoreAddOutlined />}
              tooltip="Add Button"
            />
            <FloatButton
              onClick={exportPageData}
              icon={<ExportOutlined />}
              tooltip="Export Data"
            />

            <FloatButton
              onClick={handleDeleteAllComponents}
              icon={<DeleteOutlined />}
              tooltip="Delete All"
              danger
            />
          </FloatButton.Group>
        </div>

        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          onLayoutChange={handleLayoutChange}
          rowHeight={30}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          preventCollision={true}
          isDraggable={!isEditMode} // Draggable when not in edit mode
          isResizable={!isEditMode} // Resizable when not in edit mode
          compactType={null}
        >
          {components.map((component) => (
            <div
              key={component.id}
              data-grid={{ ...component, i: component.id }}
              onClick={() => handleComponentClick(component)}
              style={{
                overflow: "hidden",
                backgroundColor: "#ffffff",
                cursor: isEditMode ? "pointer" : "move",
              }}
            >
              <HolderOutlined
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  fontSize: "16px",
                  color: "#000",
                }}
                onClick={(event) => {
                  if (isEditMode) {
                    event.stopPropagation(); // Stop the event from propagating to parent
                    event.preventDefault(); // Prevent any default action (if applicable)
                    setIsModalOpen(true);
                  }
                }}
              />
              {component.type === "Iframe" && (
                <iframe
                  src={component.settings.src}
                  title="Iframe"
                  width={component.settings.width}
                  height={component.settings.height}
                  style={{ border: "none" }}
                ></iframe>
              )}
              {component.type === "Button" && (
                <Button
                  onClick={() => {
                    if (isEditMode) {
                      if (component.settings.linkType === "url") {
                        window.open(component.settings.value, "_blank");
                      } else {
                        window.location.href = `tel:${component.settings.value}`;
                      }
                    }
                  }}
                  style={{
                    background: component.settings.image
                      ? `url(${component.settings.image}) no-repeat center center`
                      : "#007bff",
                    backgroundSize:
                      component.settings.backgroundSize || "contain", // Default to "cover"
                    backgroundRepeat:
                      component.settings.backgroundRepeat || "no-repeat", // Add repeat option
                    backgroundPosition:
                      component.settings.backgroundPosition || "center", // Add position option
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {!component.settings.image &&
                    (component.settings.linkType === "url"
                      ? "Open Link"
                      : "Call")}
                </Button>
              )}
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

      {/* Edit Modal */}
      <Modal
        title={`Edit ${selectedComponent?.type}`}
        open={isModalOpen}
        onOk={handleSaveChanges}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedComponent(null);
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {selectedComponent?.type === "Iframe" && (
            <div>
              <label>
                Iframe URL:
                <Input
                  type="text"
                  name="src"
                  value={selectedComponent.settings.src || ""}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          )}

          {selectedComponent?.type === "Button" && (
            <>
              <div>
                <label>
                  Link Type:
                  <select
                    name="linkType"
                    value={selectedComponent.settings.linkType}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value="url">URL</option>
                    <option value="phone">Phone</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  {selectedComponent.settings.linkType === "url"
                    ? "Button URL:"
                    : "Phone Number:"}
                  <Input
                    type="text"
                    name="value"
                    value={selectedComponent.settings.value || ""}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Button Text:
                  <Input
                    type="text"
                    name="buttonText"
                    value={selectedComponent.settings.buttonText || ""}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Button Image:
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div>
                <label>
                  Background Size:
                  <select
                    name="backgroundSize"
                    value={selectedComponent.settings.backgroundSize || "cover"}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                    <option value="auto">Auto</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Background Repeat:
                  <select
                    name="backgroundRepeat"
                    value={
                      selectedComponent.settings.backgroundRepeat || "no-repeat"
                    }
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value="no-repeat">No Repeat</option>
                    <option value="repeat">Repeat</option>
                    <option value="repeat-x">Repeat Horizontally</option>
                    <option value="repeat-y">Repeat Vertically</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Background Position:
                  <select
                    name="backgroundPosition"
                    value={
                      selectedComponent.settings.backgroundPosition || "center"
                    }
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "0.5rem" }}
                  >
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </label>
              </div>
            </>
          )}
          <Button onClick={handleDeleteComponent} danger>
            Delete Component
          </Button>
        </div>
      </Modal>
    </DndProvider>
  );
};

export default IFrameBuilder;
