import React from "react";

const CharacterRequired: React.FC = () => {
  return (
    <div>
      <div>No smart character found</div>
      <div>Please connect with an account that owns a smart character</div>
    </div>
  );
};

export default React.memo(CharacterRequired);
