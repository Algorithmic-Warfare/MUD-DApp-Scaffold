import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function that could be used on button or automated countdown to go to main page.
  const onClick = () => {
    navigate({ pathname: "/", search: location.search });
  };

  return <div>Not Found</div>;
};

export default React.memo(NotFound);
