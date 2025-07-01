import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import Players from "./pages/players";
import Teams from "./pages/teams";
import Games from "./pages/games";
import TestChart from "./pages/testChart";
import TestCurl from "./pages/testCurl";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/players" element={<Players />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/games" element={<Games />} />
                <Route path="/testChart" element={<TestChart />} />
                <Route path="/testCurl" element={<TestCurl />} />
            </Routes>
        </Router>
    );
}

export default App;