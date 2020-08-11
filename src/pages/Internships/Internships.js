/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useCallback } from "react";
import InternshipsController from "./InternshipsController";
import { useStickyDispatch } from "contexts/app/app.provider";

function Internships() {
  const useDispatch = useStickyDispatch();
  const setAppState = useCallback(() => useDispatch({ type: "VIEW" }), [
    useDispatch,
  ]);
  useEffect(() => {
    setAppState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <InternshipsController />;
}
export default Internships;