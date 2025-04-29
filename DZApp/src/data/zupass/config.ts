import { Zapp } from "@parcnet-js/app-connector";

export const zAppConfig: ZappConfig = createZappConfig(
  "Hacking-Protocol-0000",
  "Hacking-Protocol"
);

export type ZappConfig = Zapp & {
  collection: string;
};

function createZappConfig(appName: string, collection: string): ZappConfig {
  return {
    name: appName,
    permissions: {
      REQUEST_PROOF: { collections: [collection] },
      SIGN_POD: {},
      READ_POD: { collections: [collection] },
      INSERT_POD: { collections: [collection] },
      DELETE_POD: { collections: [collection] },
      READ_PUBLIC_IDENTIFIERS: {},
    },
    collection,
  };
}
