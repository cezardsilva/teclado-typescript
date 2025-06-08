"use client"

import { useState, useRef, useEffect } from "react";
import { Delete, CornerDownLeft, Trash2, Copy, ChevronUp, SendHorizontal } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [dialogo, setDialogo] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(true); 
  const inputRef = useRef<HTMLDivElement>(null);

  // Garantir que o input role para a esquerda automaticamente
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]); // Atualiza sempre que o input mudar

  const handleKeyPress = (key: string) => {
    if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else {
      setInput((prev) => prev + key);
    }

    if (key === "send") {
      setDialogo((prev) => prev + "\n" + input); // Adiciona nova linha ao enviar
      setInput("");
    }
  };

  const copiarTexto = () => {
    navigator.clipboard.writeText(dialogo);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const letters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                   "A", "S", "D", "F", "G", "H", "J", "K", "L",
                   "Z", "X", "C", "V", "B", "N", "M"];

  const keys = [
    "+","-","/","*","=","[","]","?",";",",",
    "!","@","#","$","%","(",")","{","}",":",
    "1","2","3","4","5","6","7","8","9","0",
    ...letters,
    "Backspace",
    "up","Enter","copy","Space","clear","lixo","send"
  ];

  return (
    <div className="container flex flex-col items-center">
      {/*Tela de mensagem com quebras de linha dinâmicas */}
      <div className="mt-4 mb-4 p-2 border border-gray-500 lg:w-96 w-80 min-h-60 text-left bg-gray-600 flex flex-col justify-between">
        <div>
          {dialogo.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <button
          className="bg-gray-700 text-white px-2 py-1 rounded self-end mt-2 text-[10px]"
          onClick={copiarTexto}
        >
          {copiado ? "✅ Copiado!" : "📋 Copiar"}
        </button>
      </div>
      
      {/* Display do teclado com rolagem no input */}
      <div 
        ref={inputRef} 
        className="mt-4 mb-4 p-2 h-10 border border-gray-500 w-80 text-left bg-gray-600 overflow-x-auto whitespace-nowrap"
      >
        {input}
      </div>
      
      {/* Layout do teclado */}
      <div className="lg:w-96 w-80 h-40 grid grid-cols-10 gap-1">
        {keys.map((key, index) => {
          const displayKey = letters.includes(key)
            ? (isUpperCase ? key : key.toLowerCase())
            : key;

          return (
            <button
              key={index}
              className={`bg-gray-800 text-white flex justify-center items-center p-1 rounded 
                ${key === "Space" || key === "Backspace" || key === "Enter" ? "text-[16px]" : ""} 
                ${key === "Enter" ? "col-span-2" : ""}  
                ${key === "Space" ? "col-span-5" : ""} 
                ${key === "clear" ? "col-span-2" : ""}
                ${key === "?" ? "question-mark" : ""}
              `}
              onClick={() => {
                if (key === "clear") {
                  setInput("");
                } else if (key === "up") {
                  setIsUpperCase((prev) => !prev);
                } else {
                  handleKeyPress(key === "Space" ? " " : displayKey);
                }
                if (key === "lixo") {
                  setDialogo("");
                  setInput("");
                }
                if (key === "send") {
                  setInput("");
                }
                if (key === "copy") {
                  copiarTexto();
                  setInput("");
                }
              }}
            >
              {key === "Backspace" ? <Delete size={18} /> :
              key === "Enter" ? <CornerDownLeft size={18} /> :
              key === "lixo" ? <Trash2 size={18} /> :
              key === "copy" ? <Copy size={18} /> :
              key === "up" ? <ChevronUp size={18} /> :
              key === "send" ? <SendHorizontal size={18} /> :
              key === "clear" ? "Clear" :
              displayKey}
            </button>
          );
        })}
      </div>
    </div>
  );
}
