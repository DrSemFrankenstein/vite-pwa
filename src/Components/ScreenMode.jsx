import { useMediaQuery } from "react-responsive";

function ScreenMode() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  // Log device type in the console
  if (isMobile) {
    console.log("Mobile View");
  } else if (isTablet) {
    console.log("Tablet View");
  } else if (isDesktop) {
    console.log("Desktop View");
  }
  return <></>;
}

export default ScreenMode;
