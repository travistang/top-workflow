import React from "react";
import { useReactFlow, XYPosition } from "reactflow";

export default function useFlowClickPosition(
  wrapper: React.MutableRefObject<HTMLDivElement | null>
) {
  const { project } = useReactFlow();

  const clickHandler =
    (callback: (position: XYPosition) => void) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!wrapper.current) return;
      const { top, left } = wrapper.current.getBoundingClientRect();
      const isPaneClicked = (e.target as HTMLDivElement).classList.contains(
        "react-flow__pane"
      );
      if (!isPaneClicked) return;
      const { clientX, clientY } = e;
      const position = project({ x: clientX - left - 75, y: clientY - top });
      callback(position);
    };

  return clickHandler;
}
