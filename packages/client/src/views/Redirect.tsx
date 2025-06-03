import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface RedirectProps {
  path: string;
}

const Redirect: React.FC<RedirectProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      pathname: `${location.pathname}${props.path}`,
      search: location.search,
    });
  }, []);

  return null;
};

export default React.memo(Redirect);
