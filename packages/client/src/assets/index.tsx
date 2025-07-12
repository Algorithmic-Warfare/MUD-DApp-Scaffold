/**
 * @file
 * @summary Centralized export for various static assets used in the client application.
 * @description This file serves as a single point of truth for importing and re-exporting
 * SVG logos, background images, and font files. This approach simplifies asset management
 * and ensures consistent referencing throughout the application.
 */

// SVG Logo Components
/**
 * @summary Primary SVG logo component.
 * @description This component represents the main vector logo for the application,
 * typically used in prominent UI elements.
 */
import PrimaryLogo from "./Vector-Logo/Primary.svg";
/**
 * @summary Secondary SVG logo component.
 * @description This component represents an alternative vector logo for the application,
 * used in contexts where the primary logo might not be suitable.
 */
import SecondaryLogo from "./Vector-Logo/Secondary.svg";
export { PrimaryLogo, SecondaryLogo };

// Background Image
/**
 * @summary Path to the background GIF image.
 * @description This constant provides the relative path to the animated background image
 * used in various parts of the application's UI.
 */
export const backgroundImage = "./background.gif";

// Font Files
/**
 * @summary Path to the ABC Favorit Light font file.
 * @description This constant provides the relative path to the 'ABC Favorit Light'
 * OpenType font file, used for specific typographic styles in the application.
 */
export const favoritLightFont = "./fonts/abc-favorit-light.otf";
/**
 * @summary Path to the ABC Favorit Mono Book font file.
 * @description This constant provides the relative path to the 'ABC Favorit Mono Book'
 * OpenType font file, used for monospaced typographic styles in the application.
 */
export const favoritMonoBookFont = "./fonts/abc-favorit-mono-book.otf";
/**
 * @summary Path to the ABC Favorit Mono Light font file.
 * @description This constant provides the relative path to the 'ABC Favorit Mono Light'
 * OpenType font file, used for monospaced typographic styles in the application.
 */
export const favoritMonoLightFont = "./fonts/abc-favorit-mono-light.otf";
/**
 * @summary Path to the Disket Mono Bold font file.
 * @description This constant provides the relative path to the 'Disket Mono Bold'
 * TrueType font file, used for bold monospaced typographic styles in the application.
 */
export const disketMonoBoldFont = "./fonts/disket-mono-bold.ttf";
/**
 * @summary Path to the Disket Mono Regular font file.
 * @description This constant provides the relative path to the 'Disket Mono Regular'
 * TrueType font file, used for regular monospaced typographic styles in the application.
 */
export const disketMonoRegularFont = "./fonts/disket-mono-regular.ttf";
