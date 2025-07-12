/**
 * @file
 * @summary Configures and exports the dayjs library for consistent date and time handling.
 * @description This file initializes the dayjs library with essential plugins:
 * `utc` for UTC time handling, `relativeTime` for human-readable relative time formats,
 * and `duration` for working with time durations. It then exports the configured
 * dayjs instance for use throughout the application, ensuring all date/time operations
 * adhere to a consistent setup.
 *
 * @exports dayjs - The configured dayjs instance with UTC, relativeTime, and duration plugins.
 *
 * @notes
 * ## AI Usage Guidance:
 * - **Centralized Date/Time**: AI should always use this exported `dayjs` instance
 *   for any date, time, or duration calculations to maintain consistency.
 * - **Plugin Awareness**: Be aware that `utc`, `relativeTime`, and `duration`
 *   functionalities are available by default.
 * - **Avoid Direct Imports**: Do not import `dayjs` directly from the `dayjs` package;
 *   always import from this utility file to ensure proper plugin configuration.
 */
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relative from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(relative);
dayjs.extend(duration);

export default dayjs;