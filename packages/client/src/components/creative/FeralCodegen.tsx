/**
 * @file
 * @summary Provides a React component that generates "feral" (randomly generated) code snippets.
 * @description This file exports the `FeralCodegen` component, which is a memoized React component
 * that generates random strings of characters, optionally with trailing block glyphs,
 * and applies conditional styling. It's designed for visual effect rather than functional code.
 *
 * @exports FeralCodegen - A React component that generates random code snippets.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Decorative Component**: This component is primarily for visual flair and does not contain business logic.
 * - **Randomness**: The `randomCode` and `glyphs` functions are responsible for generating the random output.
 * - **Conditional Styling**: The `biasedBoolFlip` function is used to randomly apply a CSS class.
 */
import React from "react";

/**
 * @summary Generates "feral" (randomly generated) code snippets.
 * @description This memoized React component produces random strings of characters,
 * simulating code, and can optionally append block glyphs. It also applies a random
 * text color based on a biased boolean flip.
 *
 * @returns {JSX.Element} A React element displaying a randomly generated code snippet.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Pure Component**: Being `React.memo` wrapped, it re-renders only when its props change (though it takes no props).
 * - **Internal Logic**: The core logic for generating random strings and glyphs is encapsulated within `randomCode` and `glyphs`.
 */
const FeralCodegen = React.memo(() => {
  /**
   * @summary Generates a random string of characters.
   * @description This function creates a string of random characters from a predefined set,
   * with a length between 3 and 10 characters. The character set is biased towards hyphens.
   *
   * @returns {string} A string of random "feral" code.
   *
   * @notes
   * ## AI Usage Guidance:
   * - **Character Set**: The `characters` string defines the pool of characters for generation.
   * - **Length Variation**: The length of the generated string is randomized.
   */
  const randomCode = () => {
    const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789------------------------------...`;
    const length = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    let value = "";
    for (let i = 0; i < length; i++) {
      value += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return value;
  };

  /**
   * @summary Determines the number of trailing block glyphs.
   * @description This function randomly selects a count (0, 1, or 2) from a biased array
   * and returns a string consisting of that many '▮' unicode characters.
   *
   * @returns {string} A string containing 0 to 2 instances of the '▮' glyph.
   *
   * @notes
   * ## AI Usage Guidance:
   * - **Biased Randomness**: The `choices` array introduces a higher probability for 0 or 1 glyphs.
   * - **Unicode Character**: The '▮' character is a specific unicode block element.
   */
  const glyphs = () => {
    const choices = [0, 0, 0, 1, 1, 2];
    // Randomly pick an index from the choices array
    const randomIndex = Math.floor(Math.random() * choices.length);
    const glyphCount = choices[randomIndex];
    return "▮".repeat(glyphCount);
  };

  /**
   * @summary Determines a biased boolean value.
   * @description This function returns `true` with a given `probability` (defaulting to 0.4),
   * and `false` otherwise.
   *
   * @param {number} [probability=0.4] - The probability (between 0 and 1) of returning `true`.
   * @returns {boolean} A boolean value determined by the specified probability.
   *
   * @notes
   * ## AI Usage Guidance:
   * - **Random Decision**: Used for introducing randomness in conditional logic, such as styling.
   */
  const biasedBoolFlip = (probability = 0.4) => {
    return Math.random() < probability;
  };

  return (
    <div className={biasedBoolFlip(0.5) ? "" : "text-secondary-500"}>
      {randomCode()}
      {glyphs()}
      {biasedBoolFlip() ? (
        <>
          <br />
          {randomCode()}
        </>
      ) : null}
    </div>
  );
});

export default FeralCodegen;
