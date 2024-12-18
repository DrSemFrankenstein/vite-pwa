import React, { useEffect, useState } from "react";

function InstallAppButton() {
  const [isInstallPromptAvailable, setIsInstallPromptAvailable] =
    useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      navigator.standalone
    ) {
      setIsAppInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      console.log("beforeinstallprompt event fired");
      e.preventDefault(); // Prevent auto-prompt
      setIsInstallPromptAvailable(true);
      setDeferredPrompt(e); // Save the event
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setIsInstallPromptAvailable(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      console.log("Showing install prompt");
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        console.log("User choice:", choiceResult.outcome);
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setIsInstallPromptAvailable(false);
      });
    } else {
      console.log("No deferred prompt available");
    }
  };

  return (
    <button
      onClick={handleInstallClick}
      style={{
        ...buttonStyle,
        backgroundColor: isAppInstalled ? "#ccc" : "#007bff",
        cursor: isAppInstalled ? "not-allowed" : "pointer",
      }}
      disabled={isAppInstalled || !isInstallPromptAvailable}
    >
      {isAppInstalled ? "App Installed" : "Install App"}
    </button>
  );
}

const buttonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "10px 20px",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
};

export default InstallAppButton;
