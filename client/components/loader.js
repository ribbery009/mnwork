import ClipLoader from "react-spinners/ClipLoader";


function CustomClipLoader(loading) {

  return (
      <ClipLoader color={"#ffffff"} loading={!loading} size={150} />
  );
}

export default CustomClipLoader;