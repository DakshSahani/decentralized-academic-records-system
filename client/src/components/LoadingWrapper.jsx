import { useAppContext } from "../context/Context";
import Loader from "./Loader";

export default function LoadingWrapper({children}) {
  const { loading } = useAppContext();

  if(loading) {
    return (
      <div className="w-full mt-8 flex justify-center items-center">
        <Loader loading={loading} size={"2rem"} color="black"/>
      </div>
    )
  }

  return children;
}
