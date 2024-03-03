import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-1">
      <Image src="/assets/icons/logo.svg" alt="logo" width={20} height={24} />
      <h3 className="text-2xl font-bold text-white-100">GitNote</h3>
    </div>
  );
};

export default Logo;
