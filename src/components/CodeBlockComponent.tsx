import React, { useState, useEffect } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import coldWinterTheme from "@/util/cold-winter.js";
import SyntaxHighlighter from "react-syntax-highlighter";
import { languageOptions } from "@/util/data";
import Select from "react-select";
import { codeblockstyles } from "@/util/dropdown-styles";
import { MdDone } from "react-icons/md";

type codeProps = {
  selectedAlgo: any;
};

function CodeBlock({ selectedAlgo }: codeProps) {
  const [copied, setCopied] = useState(false);
  const [selectedLang, setSelectedLang] = useState("jscode");

  const language = () => {
    if (selectedLang == "jscode") {
      return "javascript";
    } else if (selectedLang == "pycode") {
      return "python";
    } else return "c++";
  };

  useEffect(() => {
    let timeout: any;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <div className="w-full lg:w-1/3 border-l-2 border-[#063e59] flex flex-col h-[600px] lg:h-calc overflow-auto scrollbar scrollbar-none">
      <div className="bg-[#04293a] py-2 px-3 flex items-center justify-between">
        <Select
          styles={codeblockstyles}
          className="w-[150px] rounded-md"
          options={languageOptions}
          instanceId="select-speed"
          defaultValue={languageOptions[0]}
          onChange={(e: any) => setSelectedLang(e?.value)}
        />
        {copied ? (
          <div className="flex items-center space-x-1">
            <MdDone size={17} color="#E0E0E0" />
            <p className="text-[13px] font-medium text-[#E0E0E0]">Copied!</p>
          </div>
        ) : (
          <div
            className="cursor-pointer btnclick flex items-center space-x-1"
            onClick={() => {
              setCopied(true);
              navigator.clipboard.writeText(selectedAlgo[selectedLang]);
            }}
          >
            <HiOutlineClipboardCopy size={17} color="#E0E0E0" />
            <p className="text-[13px] xl:block hidden font-medium text-[#E0E0E0]">
              Copy code
            </p>
          </div>
        )}
      </div>
      <div className="flex-1 px-4 py-2">
        <SyntaxHighlighter
          language={language()}
          style={coldWinterTheme}
          showLineNumbers={false}
        >
          {selectedAlgo[selectedLang]}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default CodeBlock;
