import React, { useState } from "react";
import AssigameLogin from "./AssigameLogin";
import AssigameSignup from "./AssigameSignup";

export default function AssigameAuthApp() {
  const [page, setPage] = useState("login");

  if (page === "signup") {
    return <AssigameSignup onNavigate={setPage} />;
  }
  return <AssigameLogin onNavigate={setPage} />;
}
