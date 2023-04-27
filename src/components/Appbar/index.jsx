import React, { useEffect } from "react";
import { useSpring } from "react-spring";
import PrimaryAppbar from "./PrimaryAppbar";

export const ScrollDirection = {
  up: "up",
  down: "down",
};

const Appbar = () => {
  const [animateSecondaryHeader, setAnimateSecondaryHeader] = useSpring(() => ({
    height: 100,
    top: 0,
  }));
  const threshold = 100;

  useEffect(() => {
    let previousScrollYPosition = window.scrollY;

    const scrolledMoreThanThreshold = (currentScrollYPosition) =>
      Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;

    const isScrollingUp = (currentScrollYPosition) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;

      if (scrolledMoreThanThreshold(currentScrollYPosition)) {
        const newScrollDirection = isScrollingUp(currentScrollYPosition)
          ? ScrollDirection.down
          : ScrollDirection.up;

        if (newScrollDirection === "up") {
          setAnimateSecondaryHeader({
            height: 100,
            top: 0,
          });
        } else if (newScrollDirection === "down" && window.scrollY) {
          setAnimateSecondaryHeader({
            height: window.scrollY < 400 ? 100 : 0,
            top: window.scrollY < 400 ? 0 : -100,
          });
        }

        previousScrollYPosition =
          currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <PrimaryAppbar style={animateSecondaryHeader} />;
};

export default Appbar;
