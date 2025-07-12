/**
 * @file
 * @summary Re-exports creative components for easier access.
 * @description This index file serves as a central point for exporting various
 * creative UI components, making them easily importable from a single path.
 *
 * @exports FeralCodegen - A component for generating random code snippets.
 * @exports FeralCodegenLayout - A layout component for arranging FeralCodegen instances.
 * @exports LoadingAnimation - A customizable loading animation component.
 * @exports ScrambleTextReveal - A component that animates text with a scramble effect.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Module Aggregation**: This file simplifies imports for creative components.
 * - **Component Discovery**: AI tools can scan this file to identify available creative components.
 */
import FeralCodegenLayout from "./FeralCodegenLayout";
import FeralCodegen from "./FeralCodegen";
import LoadingAnimation from "./LoadingAnimation";
import ScrambleTextReveal from "./ScrambleTextReveal";

export {
  FeralCodegen,
  FeralCodegenLayout,
  LoadingAnimation,
  ScrambleTextReveal,
};
