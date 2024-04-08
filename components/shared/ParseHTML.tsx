"use client";
import Image from "next/image";
import Prism from "prismjs";
import React, { useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-aspnet";
import "prismjs/components/prism-sass";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-solidity";
import "prismjs/components/prism-json";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-r";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-go";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-mongodb";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface Props {
  data: string;
}

const ParseHTML = ({ data }: Props) => {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
    });
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [data]);

  return (
    <div className="w-full text-wrap">
      <pre className="line-numbers">
        <code className="language-jsx">{data}</code>
        <button
          onClick={() => copyCode(data)}
          className="absolute right-0 top-0 rounded-sm bg-black-800 p-4"
        >
          <Image
            src="/assets/icons/copy.svg"
            alt="Copy Code Block"
            width={16}
            height={16}
          />
        </button>
      </pre>
    </div>
  );
};

export default ParseHTML;
