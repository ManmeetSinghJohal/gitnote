"use client";
import Image from "next/image";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prism-themes/themes/prism-one-dark.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import React, { useEffect, useState } from "react";

const Preview = ({ code }) => {
  const [activeElement, setActiveElement] = useState("preview");
    useEffect(() => {
      if (activeElement === "preview") {
        Prism.highlightAll();
      }
    }, [activeElement]);


  const onClickHandler = (element: string) => {
    setActiveElement(element);
  };

  return (
    <div>
      <div className="mb-7 flex space-x-6">
        <div
          className={`flex h-9 items-center gap-2 border-b-2 ${activeElement === "preview" ? "border-white-100" : "border-transparent"}`}
          onClick={() => onClickHandler("preview")}
        >
          <div>
            <Image
              src="/assets/icons/icn-eye.png"
              alt="preview"
              width={16}
              height={16}
            />
          </div>
          <div className="paragraph-3-medium text-white-100">Preview</div>
        </div>

        <div
          className={`flex h-9 items-center gap-2 border-b-2 ${activeElement === "code" ? "border-white-100" : "border-transparent"}`}
          onClick={() => onClickHandler("code")}
        >
          <div>
            <Image
              src="/assets/icons/codeArrows.svg"
              alt="code"
              width={16}
              height={16}
            />
          </div>
          <div className="paragraph-3-medium text-white-100">Code</div>
        </div>
      </div>
      {activeElement === "preview" && (
        <div className="">
          <div className="max-w-[350px] sm:max-w-[550px] md:max-w-[650px] 2xl:max-w-[900px]">
            <pre className="line-numbers">
              <code className="language-jsx">{code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;
