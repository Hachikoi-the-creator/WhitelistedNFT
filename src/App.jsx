import { useMoralis, useWeb3Contract } from "react-moralis";
// import { abi } from "../constants/abi";
import { useState, useEffect, useRef } from "react";

export default function App() {
  let pageLoaded = useRef(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const { enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!pageLoaded) {
      // ensures the page will only load once
      pageLoaded.current = true;

      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
      }
    }
  });

  const {
    data,
    error,
    runContractFunction: storeFunction,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: "0xAcb69A95a280276795F2191A469da2881b70813d",
    functionName: "theNum",
  });

  // example whit params
  // const { data, error, runContractFunction: storeFunction, isFetching, isLoading } =
  //   useWeb3Contract({
  //     abi: abi,
  //     contractAddress: "0xAcb69A95a280276795F2191A469da2881b70813d",
  //     functionName: "store",
  //     params: {
  //       _favoriteNumber: 42,
  //     },
  //   });

  const connectBtn = () => {
    const options = {
      red: 1,
    };
    if (hasMetamask) {
      if (isWeb3Enabled) {
        return <button>Connected!</button>;
      } else {
        return <button onClick={() => enableWeb3(options)}>Connect</button>;
      }
    } else {
      return <h1>install metamask</h1>;
    }
  };

  return (
    <div>
      {connectBtn()}
      {Number(data)}

      {isWeb3Enabled ? (
        <button onClick={() => storeFunction()}>Execute</button>
      ) : (
        ""
      )}
    </div>
  );
}
