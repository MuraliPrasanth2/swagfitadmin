import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSlots from "./Pages/AllSlots";

//
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<AllSlots />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
