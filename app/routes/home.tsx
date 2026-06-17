import { useState } from "react";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "JavaScript Calculator" },
    { name: "description", content: "Calculate your daily needs" },
  ];
}

export default function Home() {
  const [result, setResult] = useState(0);
  const [content, setContent] = useState("0");
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    const element = event.currentTarget.innerText;

    if (element === "AC") handleClear();
    else if (element === "=") handleEquals();
    else if (["+", "-", "*", "/"].includes(element)) handleOperator(element);
    else if (element === ".") handleDecimal();
    else handleNumber(element);
  };

  const handleNumber = (id: string) => {
    setContent((prevContent) => {
      if (isEvaluated) {
        setIsEvaluated(false);
        if (id === "0") return "0";
        return id;
      }
      if (prevContent === "0") return id;
      return prevContent + id;
    });
  };

  const handleOperator = (id: string) => {
    if (isEvaluated) {
      setIsEvaluated(false);
      setContent(result.toString() + id);
      return;
    }
    setContent((prevContent) => {
      if (/[+\-*/]$/.test(prevContent)) {
        if (id === "-") {
          if(prevContent.endsWith("-")) return prevContent;
          return prevContent + id;
        }
        else {
          return prevContent.replace(/[+\-*/]+$/, id);
        }
      }
      return prevContent + id;
    });
  };

  const handleEquals = () => {
    setResult(eval(content));
    setIsEvaluated(true);
  };

  const handleClear = () => {
    setResult(0);
    setContent("0");
    setIsEvaluated(false);
  };

  const handleDecimal = () => {
    const parts = content.split(/[+\-*/]/);
    const current = parts[parts.length - 1];
    if (current.includes(".")) return;
    if (isEvaluated) {
      setIsEvaluated(false);
      setContent("0.");
      return;
    }
    setContent((prevContent) => {
      return prevContent + ".";
    });
  };

  return (
    <main className="flex flex-col flex-1 justify-center items-center max-w-sm bg-slate-900 p-4 rounded-xl gap-4">
      <div
        id="display"
        className="bg-slate-200 text-slate-950 p-2 px-4 w-full rounded-lg text-right text-lg h-[50px]"
      >
        {isEvaluated ? result : content}
      </div>
      <div className="flex w-full gap-4 text-2xl">
        <div className="grid grid-cols-3 gap-4 flex-1">
          <button
            id="clear"
            className="col-span-3 text-lg"
            onClick={handleClear}
          >
            AC
          </button>
          <button id="one" onClick={handleInput}>
            1
          </button>
          <button id="two" onClick={handleInput}>
            2
          </button>
          <button id="three" onClick={handleInput}>
            3
          </button>
          <button id="four" onClick={handleInput}>
            4
          </button>
          <button id="five" onClick={handleInput}>
            5
          </button>
          <button id="six" onClick={handleInput}>
            6
          </button>
          <button id="seven" onClick={handleInput}>
            7
          </button>
          <button id="eight" onClick={handleInput}>
            8
          </button>
          <button id="nine" onClick={handleInput}>
            9
          </button>
          <button id="zero" onClick={handleInput} className="col-start-2">
            0
          </button>
          <button id="decimal" onClick={handleInput} className="col-start-3">
            .
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <button id="add" onClick={handleInput}>
            +
          </button>
          <button id="subtract" onClick={handleInput}>
            -
          </button>
          <button id="multiply" onClick={handleInput}>
            *
          </button>
          <button id="divide" onClick={handleInput}>
            /
          </button>
          <button id="equals" onClick={handleInput}>
            =
          </button>
        </div>
      </div>
    </main>
  );
}
