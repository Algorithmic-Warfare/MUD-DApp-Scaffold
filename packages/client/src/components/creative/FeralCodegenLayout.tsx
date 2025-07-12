/**
 * @file
 * @summary Provides a layout component for arranging multiple FeralCodegen instances.
 * @description This file exports the `FeralCodegenLayout` component, which is responsible
 * for rendering a specified number of `FeralCodegen` components in a horizontally
 * distributed layout. It allows for custom styling and control over the number of
 * code snippets displayed.
 *
 * @exports FeralCodegenLayout - A layout component for arranging FeralCodegen instances.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Composition**: This component demonstrates how to compose multiple instances of another component (`FeralCodegen`).
 * - **Dynamic Rendering**: The `codes.map` function is used to dynamically render multiple `FeralCodegen` components.
 * - **Styling**: The `style` prop allows for external CSS classes to be applied to the layout container.
 */
import FeralCodegen from "./FeralCodegen";

/**
 * @summary Props for the FeralCodegenLayout component.
 * @property {string} [style] - Optional CSS classes to apply to the layout container.
 * @property {number} [count=5] - The number of `FeralCodegen` components to render.
 */
interface FeralCodegenLayoutProps {
  style?: string;
  count?: number;
}

/**
 * @summary A layout component for arranging multiple FeralCodegen instances.
 * @description This component renders a series of `FeralCodegen` components,
 * distributing them horizontally across the width of their container.
 * The number of `FeralCodegen` instances can be controlled via the `count` prop.
 *
 * @param {FeralCodegenLayoutProps} props - The props for the FeralCodegenLayout component.
 * @returns {JSX.Element} A React element displaying multiple FeralCodegen instances.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Array Mapping**: The `Array.from` and `map` pattern is used to generate a list of components.
 * - **Key Prop**: The `key={index}` is crucial for React's reconciliation process when rendering lists.
 */
const FeralCodegenLayout = ({ style, count = 5 }: FeralCodegenLayoutProps) => {
  const codes = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      className={`absolute flex justify-between px-10 justify-items-center w-full text-xs ${style}`}
    >
      {codes.map((index) => (
        <FeralCodegen key={index} />
      ))}{" "}
    </div>
  );
};

export default FeralCodegenLayout;
