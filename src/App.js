import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllSlots from "./Pages/AllSlots";
import SlotDetails from "./Pages/SlotDetails";

//
function App() {
    return (
        <div className="font-Montserrat min-h-screen bg-black max-w-6xl mx-auto text-white px-8 pb-4">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<AllSlots />} />
                    <Route path="/slotdetails" element={<SlotDetails />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
