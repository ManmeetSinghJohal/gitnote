"use client";
import Image from "next/image";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useToast } from "@/components/ui/use-toast";

interface Props {
  data: string;
}

const HighlightedCode = ({ data }: Props) => {
  const { toast } = useToast();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
    });
  };

  return (
    <div className="w-full text-wrap">
      <SyntaxHighlighter
        wrapLongLines
        customStyle={{
          border: "1px solid #1D2032",
          backgroundColor: "#131625",
          borderRadius: "5px",
        }}
        language="typescript"
        style={monokai}
        PreTag={(props) => <pre {...props} className="relative" />}
        CodeTag={(props) => {
          return (
            <>
              <code {...props} />
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
            </>
          );
        }}
      >
        {data}
      </SyntaxHighlighter>
    </div>
  );
};

export default HighlightedCode;
