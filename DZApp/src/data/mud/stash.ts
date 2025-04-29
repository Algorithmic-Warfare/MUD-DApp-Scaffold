import {
  Matches,
  QueryUpdates,
  TableUpdate,
  TableUpdates,
  Unsubscribe,
  createStash,
} from "@latticexyz/stash/internal";

import config from "src/data/mud/mudConfig";

export const stash = createStash(config);

// Implement other data fetching functions