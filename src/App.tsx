import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  let name: string = "Click Me";
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="w-screen h-screen justify-center items-center flex flex-col gap-4">
        <div className="flex gap-2">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <Button onClick={() => setCount((count) => count + 1)}>
          {count !== 0 ? `Clicked ${count} times` : name}
        </Button>
      </div>
    </>
  );
}

export default App;
