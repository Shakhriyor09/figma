import "./index.css"
import {BrowserRouter} from "react-router-dom"
import MainRouter from "./routes/MainRouter";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
    <BrowserRouter>
      <MainRouter/>
      </BrowserRouter>
    <ToastContainer theme="colored"></ToastContainer>
      </>
  );
}

export default App;
