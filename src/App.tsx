import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./";
import Intro from "./Intro";
import Conveyer from "./Conveyer";
import Flicking from "./Flicking";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/intro" element={<Intro />} />
            <Route path="/Conveyer" element={<Conveyer />} />
            <Route path="/Flicking" element={<Flicking />} />
        </Routes>
    );
}

export default App;
