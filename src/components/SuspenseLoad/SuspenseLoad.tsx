import React, { Suspense } from "react";

const SuspenseLoad: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Suspense fallback="Loading ...">{children}</Suspense>;
};

export default SuspenseLoad;
