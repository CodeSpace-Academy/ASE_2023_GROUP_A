import React from "react";
import theme from "./LoadingCard.module.css";

const LoadingCard = () => (
  <div className={`${theme.mainitem}`}>
    <div className={`${theme.animatedbackground}`}>
      <div className={`${theme.backgroundmasker} ${theme.btndivideleft}`} />
    </div>
  </div>
);

export default LoadingCard;
