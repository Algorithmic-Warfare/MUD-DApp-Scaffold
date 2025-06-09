declare module "@tasul/shuffle-text" {
  class ShuffleText {
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

    play(): void;
    clear(): void;
  }

  export = ShuffleText;
}
