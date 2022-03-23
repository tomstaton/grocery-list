import { useRef } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import ReactToPrint from "react-to-print";
import { ListToPrint } from "./components/listToPrint/list-to-print";

function App() {
  const componentRef = useRef();

  return (
    <>
      <div>
        <ReactToPrint
          trigger={() => <Button>Print Your List!</Button>}
          content={() => componentRef.current}
        />
        <ListToPrint ref={componentRef} />
      </div>
    </>
  );
}

export default App;
