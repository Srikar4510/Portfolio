import React from "react";
import GitHubCalendar from "react-github-calendar";

function Github() {
  return (
    <div className="flex flex-col items-center pb-10">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-10">
        Days I <span className="text-black">Code</span>
      </h1>
      <GitHubCalendar
        username="Srikar4510"
        blockSize={15}
        blockMargin={5}
        color="#c084f5"
        fontSize={16}
      />
    </div>
  );
}

export default Github;
