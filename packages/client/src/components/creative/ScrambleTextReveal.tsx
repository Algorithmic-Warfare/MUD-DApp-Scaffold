import { useState, useEffect, useMemo, useCallback, useRef } from "react";

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
 * ScrambleTextReveal - Animates text with scramble effect on hover
 * @param {string} text - Text to display and animate
 * @param {string} [element='h1'] - HTML element to render
 * @param {string} [scrambleCharacters] - Custom scramble characters
 * @param {number} [animationSpeed=1] - Relative animation speed (1 = normal)
 * @param {number} [speedMultiplier=1] - Speed multiplier (2 = twice as fast)
 * @param {number} [scrambleInterval=1] - Frames between scramble changes (higher = slower)
 * @param {string} [className] - Additional CSS classes
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
