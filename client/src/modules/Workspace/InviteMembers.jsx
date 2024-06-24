import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MdMailOutline } from "react-icons/md";

const InviteMembers = () => {
  const [invite, setInvite] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={invite ? "Enter Email" : "Search User"}
          className="w-full"
        />
        {invite && <Button variant="outline">Invite</Button>}
      </div>

      {!invite && (
        <div className="bg-white shadow-md p-4 rounded-md absolute w-full">
          <p className="text-sm font-semibold">Search Result</p>

          <div
            onClick={() => setInvite(true)}
            className="text-blue-600 flex justify-start items-center gap-2 mt-2 cursor-pointer w-max hover:bg-slate-200 hover:p-2 hover:rounded-md transition-all duration-300"
          >
            <MdMailOutline className="text-lg" />
            <p className="text-sm font-medium ">Invite User Via Email!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteMembers;
