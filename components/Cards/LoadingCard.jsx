import theme from "./LoadingCard.module.css";

const LoadingCard = () => {
  return (
    <div className={`${theme.mainitem}`}>
      <div className={`${theme.animatedbackground}`}>
        <div className={`${theme.backgroundmasker} ${theme.btndivideleft}`}>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
