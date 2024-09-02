import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ViewOneEmploye() {
  return (
    <>
      <div className="flex ">
        <div className="w-1/4  ">
            hello
        </div>
        <div className="border flex-grow">
          <Outlet />
        </div>
      </div>
    </>
  );
}
