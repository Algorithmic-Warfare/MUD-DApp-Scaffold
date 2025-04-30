import React, { ReactNode } from "react";

interface StyleProps {
  left: string;
  rightPosition: string;
  right: string;
}

const EveLoadingAnimation = React.memo(
  ({
    position,
    children,
  }: {
    position: "horizontal" | "vertical" | "diagonal";
    children: ReactNode;
  }) => {
    const renderBoxes = () => {
      const boxes: JSX.Element[] = [];
      for (let i = 0; i < 6; i++) {
        boxes.push(
          <div
            key={i}
            className="h-2 w-2 animated-box"
            style={{ animationDelay: `${0.5 * i}s` }}
          />,
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
  },
);

export default React.memo(EveLoadingAnimation);
