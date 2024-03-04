import Image from "next/image";
import React from "react";

type LogoProps = {
  textSize: string;
  width: number;
  height: number;
};

const Logo = ({textSize, width, height}: LogoProps) => {
  return (
    <div className="flex gap-1">
      <Image src="/assets/icons/logo.svg" alt="logo" width={width} height={height} />
      <h3 className={`${textSize} font-bold text-white-100`}>GitNote</h3>
    </div>
  );
};

export default Logo;
