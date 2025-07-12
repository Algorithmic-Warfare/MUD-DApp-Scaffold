/**
 * @file
 * @summary Provides a customizable loading animation component.
 * @description This file exports the `LoadingAnimation` component, which displays a visual
 * loading indicator composed of animated boxes. The animation's direction can be customized
 * (horizontal, vertical, or diagonal).
 *
 * @exports LoadingAnimation - A React component that displays a customizable loading animation.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **User Feedback**: Use this component to indicate ongoing processes and improve user experience during waits.
 * - **Customization**: The `position` prop allows for different visual styles of the animation.
 * - **Memoization**: The component is memoized to prevent unnecessary re-renders.
 */
import React, { ReactNode } from "react";

/**
 * @summary Defines the structure for styling properties based on animation position.
 * @property {string} left - CSS classes for the left side of the animation.
 * @property {string} rightPosition - CSS classes for positioning the right side of the animation.
 * @property {string} right - CSS classes for the right side of the animation.
 */
interface StyleProps {
  left: string;
  rightPosition: string;
  right: string;
}

/**
 * @summary A customizable loading animation component.
 * @description This memoized React component renders a loading animation with six animated boxes
 * arranged in a pattern determined by the `position` prop. It can display content alongside the animation.
 *
 * @param {object} props - The props for the LoadingAnimation component.
 * @param {"horizontal" | "vertical" | "diagonal"} props.position - The orientation of the loading animation.
 * @param {ReactNode} props.children - The content to be displayed alongside the loading animation.
 * @returns {JSX.Element} A React element displaying the loading animation and children.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Visual Indicator**: This component is purely for visual feedback during asynchronous operations.
 * - **Dynamic Styling**: The `styleProps` object dynamically applies CSS classes based on the `position` prop.
 * - **Animation Delay**: Each box has a staggered `animationDelay` for a sequential effect.
 */
const LoadingAnimation = React.memo(
  ({
    position,
    children,
  }: {
    position: "horizontal" | "vertical" | "diagonal";
    children: ReactNode;
  }) => {
    /**
     * @summary Renders a series of animated box elements.
     * @description This helper function generates six `div` elements, each styled as an animated box
     * with a unique animation delay to create a sequential loading effect.
     *
     * @returns {JSX.Element[]} An array of React elements representing the animated boxes.
     *
     * @notes
     * ## AI Usage Guidance:
     * - **Looping**: The `for` loop generates a fixed number of visual elements.
     * - **CSS Animation**: Relies on a global CSS class `animated-box` for its animation properties.
     */
    const renderBoxes = () => {
      const boxes: JSX.Element[] = [];
      for (let i = 0; i < 6; i++) {
        boxes.push(
          <div
            key={i}
            className="h-2 w-2 animated-box"
            style={{ animationDelay: `${0.5 * i}s` }}
          />
        );
      }
      return boxes;
    };

    let styleProps: StyleProps;
    switch (position) {
      case "horizontal":
        styleProps = {
          left: "",
          rightPosition: "top-0",
          right: "flex-row-reverse",
        };
        break;
      case "vertical":
        styleProps = {
          left: "flex-col-reverse",
          rightPosition: "",
          right: "flex-col-reverse",
        };
        break;
      case "diagonal":
        styleProps = {
          left: "flex-col-reverse",
          rightPosition: "top-0 self-reverse",
          right: "flex-col",
        };
    }

    return (
      <div className="relative">
        <div className="absolute -ml-6 bottom-0 cursor-default">
          <div className={`flex ${styleProps.left} gap-1`}>{renderBoxes()}</div>
        </div>
        {children}
        <div
          className={`absolute right-0 -mr-6 bottom-0 cursor-default ${styleProps.rightPosition}`}
        >
          <div className={`flex ${styleProps.right} gap-1`}>
            {renderBoxes()}
          </div>
        </div>
      </div>
    );
  }
);

export default React.memo(LoadingAnimation);
