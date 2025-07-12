/**
 * @file
 * @summary Provides a React component that animates text with a scramble effect on hover.
 * @description This file exports the `ScrambleTextReveal` component, which takes a string of text
 * and animates it with a scrambling effect when the user hovers over it. The animation
 * gradually reveals the original text while scrambling the remaining characters.
 *
 * @exports ScrambleTextReveal - A React component that animates text with a scramble effect.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Visual Effect**: This component is primarily for creating an engaging visual effect for text.
 * - **Animation Control**: Parameters like `animationSpeed`, `speedMultiplier`, and `scrambleInterval`
 *   allow fine-tuning the animation's behavior.
 * - **Performance**: Uses `requestAnimationFrame` for smooth animations and `useCallback`/`useMemo`
 *   for performance optimization.
 */
import { useState, useEffect, useMemo, useCallback, useRef } from "react";

/**
 * @summary Props for the ScrambleTextReveal component.
 * @property {string} text - The text string to display and animate.
 * @property {keyof JSX.IntrinsicElements} [element='h1'] - The HTML element type to render the text as (e.g., 'h1', 'p', 'span').
 * @property {string} [scrambleCharacters] - Optional custom set of characters to use for the scrambling effect. If not provided, a default set is used.
 * @property {number} [animationSpeed=1] - A relative speed factor for the animation. Higher values make the reveal faster.
 * @property {number} [speedMultiplier=1] - A multiplier applied to the animation speed.
 * @property {number} [scrambleInterval=1] - The number of animation frames between changes to the scrambled characters. Higher values make the scrambling appear slower.
 * @property {string} [className] - Optional CSS class names to apply to the rendered element.
 */
interface ScrambleTextRevealProps {
  text: string;
  element?: keyof JSX.IntrinsicElements;
  scrambleCharacters?: string;
  animationSpeed?: number;
  speedMultiplier?: number;
  scrambleInterval?: number;
  className?: string;
}

/**
 * @summary Animates text with a scramble effect on hover.
 * @description This component takes a `text` prop and displays it within a specified HTML `element`.
 * On mouse hover, the text undergoes a scrambling animation where characters are randomly
 * replaced before gradually revealing the original text. The animation's speed and character set are customizable.
 *
 * @param {ScrambleTextRevealProps} props - The props for the ScrambleTextReveal component.
 * @returns {JSX.Element} A React element displaying the animated text.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Interactive Text**: This component is designed for interactive text elements that react to user input (hover).
 * - **Character Pool**: The `scrambleChars` memoized value defines the pool of characters used for the scrambling effect.
 * - **Animation Loop**: The `animate` function uses `requestAnimationFrame` to create a smooth, frame-based animation.
 * - **Cleanup**: The `cleanupAnimation` function ensures that any ongoing animation frames are cancelled when the component unmounts.
 */
const ScrambleTextReveal = ({
  text,
  element: Element = "h1",
  scrambleCharacters,
  animationSpeed = 1,
  speedMultiplier = 1,
  scrambleInterval = 1,
  className,
}: ScrambleTextRevealProps) => {
  const [headlineText, setHeadlineText] = useState(text);
  const requestRef = useRef<number | null>(null);
  const { length } = text;

  const scrambleChars = useMemo(
    () =>
      scrambleCharacters ||
      '!@#$%^&*()_+-={}[]|:";<>?,./' +
        "゠ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶヷヸヹヺ・ーヽヾヿ" +
        "ЀЁЂЃЄЅІЇЈЉЊЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяѐёђѓєѕіїјљњћќѝўџѠѡѢѣѤѥѦѧѨѩѪѫѬѭѮѯѰѱѲѳѴѵѶѷѸѹѺѻѼѽѾѿҀҁ҂҃҄҅҆҇҈҉ҊҋҌҍҎҏҐґҒғҔҕҖҗҘҙҚқҜҝҞҟҠҡҢңҤҥҦҧҨҩҪҫҬҭҮүҰұҲҳҴҵҶҷҸҹҺһҼҽҾҿӀӁӂӃӄӅӆӇӈӉӊӋӌӍӎӏӐӑӒӓӔӕӖӗӘәӚӛӜӝӞӟӠӡӢӣӤӥӦӧӨөӪӫӬӭӮӯӰӱӲӳӴӵӶӷӸӹӺӻӼӽӾӿ" +
        "■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯▰▱▲△▴▵▶▷▸▹►▻▼▽▾▿◀◁◂◃◄◅◆◇◈◉◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯" +
        "∀∁∂∃∄∅∆∇∈∉∊∋∌∍∎∏∐∑−∓∔∕∖∗∘∙√∛∜∝∞∟∠∡∢∣∤∥∦∧∨∩∪∫∬∭∮∯∰∱∲∳∴∵∶∷∸∹∺∻∼∽∾∿≀≁≂≃≄≅≆≇≈≉≊≋≌≍≎≏≐≑≒≓≔≕≖≗≘≙≚≛≜≝≞≟≠≡≢≣≤≥≦≧≨≩≪≫≬≭≮≯≰≱≲≳≴≵≶≷≸≹≺≻≼≽≾≿⊀⊁⊂⊃⊄⊅⊆⊇⊈⊉⊊⊋⊌⊍⊎⊏⊐⊑⊒⊓⊔⊕⊖⊗⊘⊙⊚⊛⊜⊝⊞⊟⊠⊡⊢⊣⊤⊥⊦⊧⊨⊩⊪⊫⊬⊭⊮⊯⊰⊱⊲⊳⊴⊵⊶⊷⊸⊹⊺⊻⊼⊽⊾⊿⋀⋁⋂⋃⋄⋅⋆⋇⋈⋉⋊⋋⋌⋍⋎⋏⋐⋑⋒⋓⋔⋕⋖⋗⋘⋙⋚⋛⋜⋝⋞⋟⋠⋡⋢⋣⋤⋥⋦⋧⋨⋩⋪⋫⋬⋭⋮⋯⋰⋱⋲⋳⋴⋵⋶⋷⋸⋹⋺⋻⋼⋽⋾⋿",
    [scrambleCharacters]
  );

  const cleanupAnimation = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  useEffect(() => {
    return cleanupAnimation;
  }, []);

  const handleMouseOver = useCallback(() => {
    cleanupAnimation();
    let iteration = 0;
    const interval = 1000 / 60; // 60fps
    const increment = animationSpeed * speedMultiplier * (interval / 1000);

    let frameCount = 0;

    const animate = () => {
      frameCount++;
      setHeadlineText((prevText) => {
        const scrambledText = prevText
          .split("")
          .map((_, index) => {
            if (index < iteration) return text[index];
            if (frameCount % scrambleInterval === 0) {
              return scrambleChars[
                Math.floor(Math.random() * scrambleChars.length)
              ];
            }
            return prevText[index];
          })
          .join("");

        iteration += increment;

        if (iteration >= length) {
          setHeadlineText(text);
          cleanupAnimation();
        }

        return scrambledText;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
  }, [text, length, scrambleChars, animationSpeed, speedMultiplier]);

  return (
    <Element
      onMouseOver={handleMouseOver}
      className={className}
      aria-live="polite"
      aria-atomic="true"
    >
      {headlineText}
    </Element>
  );
};

export default ScrambleTextReveal;
