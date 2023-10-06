import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    marginTop:'100%',
    borderColor: "green",
};

function PageLoader() {

  return (
    <div className="sweet-loading min-h-screen">
      <ClipLoader
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default PageLoader;