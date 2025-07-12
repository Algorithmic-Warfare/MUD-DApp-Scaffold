/**
 * @file
 * @summary Type declarations for the `@tasul/shuffle-text` library.
 * @description This file provides TypeScript type definitions for the `ShuffleText` class
 * from the `@tasul/shuffle-text` module, enabling type-safe usage of its constructor
 * and methods within the project.
 */
declare module "@tasul/shuffle-text" {
  /**
   * @summary Represents the ShuffleText class for animating text shuffling effects.
   * @description This class provides methods to initialize and control text shuffling
   * animations on an HTML element.
   */
  class ShuffleText {
    /**
     * @summary Creates an instance of ShuffleText.
     * @param {HTMLElement} element - The HTML element on which to apply the shuffle effect.
     * @param {object} options - Configuration options for the shuffle effect.
     * @param {string[]} options.textArray - An array of strings to shuffle through.
     * @param {boolean} [options.isAuto=false] - Whether the shuffling should start automatically.
     * @param {boolean} [options.isReplacedRandomly=false] - Whether text should be replaced randomly.
     * @param {number} [options.replaceTime=0] - The time in milliseconds for each character replacement.
     * @param {number} [options.stayTime=0] - The time in milliseconds the text stays visible before shuffling again.
     */
    constructor(
      element: HTMLElement,
      options: {
        textArray: string[];
        isAuto?: boolean;
        isReplacedRandomly?: boolean;
        replaceTime?: number;
        stayTime?: number;
      }
    );

    /**
     * @summary Starts the text shuffling animation.
     */
    play(): void;
    /**
     * @summary Clears the text shuffling animation and resets the element's text.
     */
    clear(): void;
  }

  export = ShuffleText;
}
