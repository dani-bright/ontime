import React from "react";

export const Filler = (props) => {
    return (
        <div className="filler" style={{width:`${props.percentage}%`}}></div>
    )
};