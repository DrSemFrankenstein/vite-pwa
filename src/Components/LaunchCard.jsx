import React, { useState, useEffect, useRef } from "react";
import { Card, Avatar, Button, Spin, Image } from "antd";

const { Meta } = Card;

// Utility function to access nested properties
const getValueByPath = (obj, path) => {
  return path
    .split(".")
    .reduce(
      (acc, key) => (acc && acc[key] !== undefined ? acc[key] : null),
      obj
    );
};

const GenericCard = ({ data, mediaKey, avatarKey, titleKey, subtitleKeys }) => {
  const [expanded, setExpanded] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false); // Track visibility of the card
  const cardRef = useRef(null);

  const handleMoreClick = () => {
    setExpanded(!expanded);
  };

  const handleMediaLoad = () => {
    setMediaLoaded(true); // Set media as loaded once it finishes loading
  };

  // Check if card is in the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInViewport(true); // Set true when card is in viewport
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the card is in view
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Extract the media source (e.g., YouTube iframe)
  const mediaSource = getValueByPath(data, mediaKey);
  const renderMedia = () => {
    if (!mediaSource || !isInViewport) return null; // Only load media if card is in view
    return (
      <div style={{ marginBottom: "16px" }}>
        {!mediaLoaded && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "white",
              zIndex: 1,
              opacity: 0.7,
            }}
          >
            <Spin
              size="large"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        )}
        <iframe
          width="100%"
          height="250"
          src={`https://www.youtube.com/embed/${mediaSource}`}
          title="Embedded Media"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleMediaLoad}
        ></iframe>
      </div>
    );
  };

  // Extract the avatar image URL
  const avatarSource = getValueByPath(data, avatarKey);

  // Generate a subtitle string by concatenating specified keys
  const renderSubtitle = () => {
    if (!subtitleKeys || !Array.isArray(subtitleKeys)) return "";
    return subtitleKeys
      ?.map((key) => getValueByPath(data, key))
      .filter(Boolean)
      .join(" | ");
  };

  return (
    <Card
      ref={cardRef}
      style={{ width: 300, margin: "16px auto" }}
      cover={renderMedia()}
      actions={[
        <Button key="toggle-more" type="link" onClick={handleMoreClick}>
          {expanded ? "Show Less" : "More"}
        </Button>,
      ]}
    >
      <Meta
        avatar={
          avatarSource ? (
            <Image
              width={40} // Adjust this size as needed
              src={avatarSource}
              preview={{ src: avatarSource }} // Enables large preview on click
            >
              <Avatar src={avatarSource} />
            </Image>
          ) : null
        }
        title={getValueByPath(data, titleKey)}
        description={renderSubtitle()}
      />
      {expanded && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </Card>
  );
};

export default GenericCard;
