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
import TestBar from "./pages/testBar";
import PlayerProfile from "./pages/playerProfile";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/players" element={<Players />} />
                <Route path="/player/:playerid" element={<PlayerProfile />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/games" element={<Games />} />
                <Route path="/testChart" element={<TestChart />} />
                <Route path="/testBar" element={<TestBar />} />
                <Route path="/testCurl" element={<TestCurl />} />
            </Routes>
        </Router>
    );
}

export default App;