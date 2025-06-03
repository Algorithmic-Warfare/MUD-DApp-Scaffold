import { ZupassContextProvider } from "src/data/zupass/ZupassContextProvider";
import DevPages from "./DevPages";

function DevIndex() {
  return (
    <ZupassContextProvider>
      <DevPages />
    </ZupassContextProvider>
  );
}

export default DevIndex;
