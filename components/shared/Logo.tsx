import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = {
  textSize: string;
  width: number;
  height: number;
};

const Logo = ({textSize, width, height}: LogoProps) => {
  return (
    <Link href="/dashboard">
    <div className="flex gap-1">
      <Image src="/assets/icons/logo.svg" alt="logo" width={width} height={height} />
      <h3 className={`${textSize} font-bold text-white-100`}>GitNote</h3>
    </div>
    </Link>
  );
};

export default Logo;
