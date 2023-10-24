import React from "react";
import Sorry from "../sorry.png";
const Error = (props) => {
    return (
        <div className="not-found" style={{ width: "100%" }}>
            <img
                src={Sorry}
                alt="Sorry"
                style={{ width: "150px", height: "150px" }}
            />
            <h1>Sorry</h1>
            <p>{props.error}</p>
        </div>
    );
};

export default Error;
