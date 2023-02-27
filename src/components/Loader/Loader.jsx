import React from "react";

import { StyledLoader } from "./Lodaer.styled";

function Loader() {
  return (
    <StyledLoader>
      <div className="lds-heart">
        <div />
      </div>
    </StyledLoader>
  );
}

export default Loader;
