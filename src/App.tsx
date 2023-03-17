import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Intro from "./Intro";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Intro />} />
        </Routes>
    );
}

export default App;
