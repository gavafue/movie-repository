import "./verticalmarquee.css";
const VerticalMarquee = ({ children }) => {
  return (
    <>
      <div className="microsoft containerMarquee">
        <div className="marquee">{children}</div>
      </div>
    </>
  );
};

export default VerticalMarquee;
