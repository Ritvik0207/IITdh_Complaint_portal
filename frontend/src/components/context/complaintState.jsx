import ComplaintContext from "./complaintContext";
import { useState } from "react";

const ComplaintState = (props) => {
  return (
    <>
      <ComplaintContext.Provider value={{ counts, setCounts }}>
        {props.children}
      </ComplaintContext.Provider>
    </>
  );
};

export default ComplaintState;
