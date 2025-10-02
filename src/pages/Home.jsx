import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";

import Editor from "@monaco-editor/react";
import { IoClose, IoCopyOutline, IoEyeOutline } from "react-icons/io5";
import { IoIosCode } from "react-icons/io";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { FiExternalLink, FiRefreshCcw } from "react-icons/fi";

import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";

import { toast } from 'react-toastify';

// { value: "react-css", label: "React + CSS" },
//     { value: "react-tailwind", label: "React + Tailwind CSS" },

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  // to save in localStorage
  const [outputScreen, setOutputScreen] = useState(
    () => JSON.parse(localStorage.getItem("outputScreen")) || false
  );
  const [tab, setTab] = useState(
    () => Number(localStorage.getItem("tab")) || 1
  );
  const [prompt, setPrompt] = useState(
    () => localStorage.getItem("prompt") || ""
  );
  const [frameWork, setFrameWork] = useState(
    () => JSON.parse(localStorage.getItem("frameWork")) || options[0]
  );
  const [code, setCode] = useState(
    () => localStorage.getItem("code") || ""
  );
  const [loading, setLoading] = useState(false);
  const [isNewTapOpen, setIsNewTapOpen] = useState(
    () => JSON.parse(localStorage.getItem("isNewTapOpen")) || false
  );
  
  // refresh 
  const [previewKey, setPreviewKey] = useState(0);

// 🔹 Persist state changes into localStorage
  useEffect(() => {
    localStorage.setItem("outputScreen", JSON.stringify(outputScreen));
  }, [outputScreen]);

  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  useEffect(() => {
    localStorage.setItem("prompt", prompt);
  }, [prompt]);

  useEffect(() => {
    localStorage.setItem("frameWork", JSON.stringify(frameWork));
  }, [frameWork]);

  useEffect(() => {
    localStorage.setItem("code", code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem("isNewTapOpen", JSON.stringify(isNewTapOpen));
  }, [isNewTapOpen]);


  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({apiKey:"AIzaSyA6aZge2F3tH9e3Qxa0gPidxANcdvW4948"});


  async function getResponse() {
    if (!prompt.trim()) return toast.error("Please describe your component first");

    try {
      setLoading(true);

      const isReactFramework = frameWork?.value?.includes("react");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
     You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${frameWork.value}  

Requirements:  
- The code must be clean, well-structured, and easy to understand.  
- Optimize for SEO where applicable.  
- Focus on creating a modern, animated, and responsive UI design.  
- Include high-quality hover effects, shadows, animations, colors, and typography.  
- Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
- Do NOT include explanations, text, comments, or anything else besides the code.  
- And give the whole code in a single file.
  
      ${
        isReactFramework
          ? `⚠️ IMPORTANT: Since framework = React, generate a complete React functional component using ${frameWork.label}.`
          : `⚠️ IMPORTANT: Since framework = HTML, generate a full HTML file using ${frameWork.label}.`
      }
    
`,
      });

      setCode(extractCode(response.text));
      setOutputScreen(true);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  };

const copyCode = async() => {
  if (!code.trim()) return toast.error("No code to copy");
  try {
    await navigator.clipboard.writeText(code);
    
    toast.success("Code copied to clipboard")
  } catch (error) {
    console.error('Failed to Copy :', err)
    toast.error("Failed to copy")
  }
}

const downloadFile = () => {
  if (!code.trim()) return toast.error("No code to download");

  const fileName = "SnapUI Code.html"
  const blob = new Blob([code],{type:'text/plain'})
  let url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
  toast.success("File Downloaded")
}

  return (
    <div>
      <Navbar />
      <div className="flex items-center px-[100px] justify-between gap-[30px] home-container">
        {/* Left Container */}
        <div className="left w-[50%] h-[auto] py-[30px] rounded-xl bg-[#141319] mt-5 p-[20px]">
          <h3 className="text-[20px] font-bold sp-text ">
            AI Component Generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">
            Describe your component and let AI will code for you.
          </p>

          <p className="text-[15px] font-[700] mt-4">Choose Your Framework</p>

          <Select
            className="mt-2"
            options={options}
            value={frameWork}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#111",
                borderColor: "#333",
                color: "#fff",
                boxShadow: "none",
                "&:hover": { borderColor: "#555" },
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#111",
                color: "#fff",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "#333"
                  : state.isFocused
                  ? "#222"
                  : "#111",
                color: "#fff",
                "&:active": { backgroundColor: "#444" },
              }),
              singleValue: (base) => ({ ...base, color: "#fff" }),
              placeholder: (base) => ({ ...base, color: "#aaa" }),
              input: (base) => ({ ...base, color: "#fff" }),
            }}
            onChange={(selectedOption) => setFrameWork(selectedOption)}
            
          />

          <p className="text-[15px] font-[700] mt-5">Describe your component</p>

          <textarea
            onChange={(e) => {setPrompt(e.target.value)}} value={prompt}
            className="w-full min-h-[150px] rounded-xl bg-[#000] mt-3 p-[10px] "
            placeholder="Describe your component in detail and let AI will help for your to build that component."
          ></textarea>

          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click on generate button to generate your code
            </p>

            <button
              onClick={getResponse}
              className="generate flex items-center p-[15px] 
          rounded-lg border-0 cursor-pointer bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] 
          from-green-400  to-cyan-600 mt-2 px[20px] gap-[10px]
          hover:scale-90 transition-all duration-500 font-semibold
          "
            >
              {
                loading === true ?
               <>
                  <ClipLoader size={16} color="rgba(40, 203, 87, 1)" 
                    className="text-[30px]"
                  />
               </> :
                <i>
                  <BsStars />
                </i>
              }

              Generate
            </button>
          </div>
        </div>

        {/* Right Container */}
        <div className="right relative w-[50%] h-[85vh] bg-[#141319] mt-5 rounded-xl">
          {outputScreen === false ? (
            <>  
              <div className="skeleton w-full h-full flex items-center flex-col justify-center ">
                <div
                  className="circle p-[20px] w-[70px] h-[70px] rounded-[50%] 
                bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] 
              from-green-400  to-cyan-600 flex items-center justify-center text-[30px]
              "
                >
                  <HiOutlineCode />
                </div>
                <p className="text-[16px] text-[gray] mt-3">
                  Your component & code will appear here.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top w-full h-[60px] bg-[#17171C] flex items-center gap-[15px] px-[20px] font-medium">

                  <button onClick={() => setTab(1)} className={`btn w-[50%] p-[10px] 
                    flex items-center justify-center px-[20px] gap-[10px]  rounded-xl cursor-pointer transition-all duration-300
                    ${tab === 1 ?"bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300/60  to-cyan-300/60 text-[#201f1fa3]":
                    "text-[gray]"}`}>
                      <i>
                        <IoIosCode className="text-xl"/>
                      </i>
                      Code Editor
                    </button>
                  <button onClick={() => setTab(2)} className={`btn w-[50%] p-[10px] 
                    rounded-xl cursor-pointer flex items-center justify-center px-[20px] gap-[10px] transition-all duration-300
                    ${tab === 2 ?"bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-300/60  to-cyan-300/60 text-[#201f1fa3]":
                    "text-[gray]"}`}>
                      <i>
                        <IoEyeOutline />
                      </i>
                      Live Preview
                    </button>

              </div>

              <div className="top-2 w-full h-[60px] bg-[#17171C] flex items-center justify-between px-[15px] sm:px-[20px]">
                
                {/* Left: Code Editor Label */}
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm sm:text-base">Code Editor</p>
                </div>

                {/* Right: Copy and Export Buttons */}
                <div className="flex items-center gap-2 sm:gap-3">
                  
                  {
                    tab === 1 ?
                    <>
                      <button 
                      onClick={copyCode}
                      className="w-[84px] h-[34px] sm:w-[80px] sm:h-[40px] rounded-lg border font-semibold border-zinc-800 flex items-center justify-center gap-[5px] hover:scale-90 transition-all hover:bg-[#333] duration-200">
                        <i>
                          <IoCopyOutline size={16} />
                        </i>
                        Copy
                      </button>
                      <button 
                      onClick={downloadFile}
                      className="w-[90px] h-[34px] sm:w-[90px] sm:h-[40px] rounded-lg font-semibold border border-zinc-800 flex items-center justify-center gap-[5px] hover:scale-90 transition-all hover:bg-[#333] duration-200">
                        <i>
                          <HiOutlineInboxArrowDown  size={16} />
                        </i>
                        Export
                      </button>
                    </> 
                    : 
                    <>
                      <button 
                      onClick={() => setIsNewTapOpen(true)}
                      className="w-[160px] h-[34px] sm:w-[160px] sm:h-[40px] rounded-lg font-semibold border border-zinc-800 flex items-center justify-center gap-[5px] hover:scale-90 transition-transform hover:bg-[#333] duration-200">
                        <i>
                          <FiExternalLink size={16}/>
                        </i>
                        Open in New Tab
                      </button>
                      <button 
                        onClick={() => setPreviewKey(prev => prev + 1)}
                      className="w-[120px] h-[34px] sm:w-[120px] sm:h-[40px] rounded-lg font-semibold border border-zinc-800 flex items-center justify-center gap-[5px] hover:scale-90 transition-all hover:bg-[#333] duration-200">
                        <i>
                          <FiRefreshCcw size={16} />
                        </i>
                        Refresh
                      </button>
                    </>
                  }
                  
                </div>
              </div>



              <div className="editor h-full">

                {
                  tab === 1 ?
                  <>
                  <Editor
                    height="75%"
                    theme="vs-dark"
                    language="javascript"
                    value={code}
                  />
                  </> 
                  :
                  <>
                    <iframe 
                    key={previewKey}
                    srcDoc={code} 
                    className="preview w-full h-[75%] bg-gray-500 text-black flex items-center justify-center">
                    </iframe>
                  </>
                }

              </div>
            </>
          )}

        </div>

      </div>


      {
        isNewTapOpen && (
          <div
            className="fixed inset-0 z-50 bg-white flex flex-col w-screen h-screen overflow-hidden"
          >
            {/* Top Bar */}
            <div className="w-full h-[60px] flex items-center justify-between text-xl px-6 sm:px-6 bg-gray-200 border-b text-black">
              <p className="font-bold">Preview</p>
              <button
                className="w-[36px] h-[36px] rounded-full border border-zinc-800 flex items-center justify-center hover:bg-[#4f4e4e] transition-all"
                onClick={() => setIsNewTapOpen(false)}
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Preview iframe */}
            <div className="flex-1 overflow-auto">
              <iframe
                key={previewKey}
                srcDoc={code}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        )
      }


    </div>
  );
};

export default Home;
