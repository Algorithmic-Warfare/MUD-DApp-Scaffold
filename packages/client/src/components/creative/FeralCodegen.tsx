import React from "react";

const FeralCodegen = React.memo(() => {
  /**
   * Define a biased array
   * The more often a symbol appears, the more likely it is to show up in the random generator
   * @returns A string of random feral code
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
   * Determine number of end ´▮´ unicode characters
   * Define a biased array with more 0s and 1s than 2s
   * @returns Between 0 and 2 instances of ´▮´
   */
  const glyphs = () => {
    const choices = [0, 0, 0, 1, 1, 2];
    // Randomly pick an index from the choices array
    const randomIndex = Math.floor(Math.random() * choices.length);
    const glyphCount = choices[randomIndex];
    return "▮".repeat(glyphCount);
  };

  /**
   * Determine a biased boolean
   * @param Probability Optional - set to 0.4 by default
   * @returns Boolean
   */
  const biasedBoolFlip = (probability = 0.4) => {
    return Math.random() < probability;
  };

  return (
    <div className={biasedBoolFlip(0.5) ? "" : "text-brightquantum-5"}>
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
