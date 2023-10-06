import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  height:"20px",
  width:"20px",
  display: "block",
  margin: "0 auto",
  transform:'translateY(-50%)',
  borderColor: "Green",
};

const PreLoder = () => {

  return (
    <div className="sweet-loading">
      <ClipLoader
        cssOverride={override}
        size={160}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default PreLoder