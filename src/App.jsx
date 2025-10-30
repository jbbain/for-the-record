import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Escape from "./pages/Escape";
import Lounge from "./pages/Lounge";
import ExternalDonateRedirect from "./pages/ExternalDonateRedirect";
import RSVPPage from "./pages/RSVP";
import RSVPSuccess from "./pages/RSVPSuccess";
import "./styles/theme.css";
import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App(){
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/escape" element={<Escape/>} />
        <Route path="/lounge" element={<Lounge/>} />
        <Route path="/rsvp" element={<RSVPPage/>}/>
        <Route path="/rsvp/success" element={<RSVPSuccess/>}/>
        <Route path="/donate" element={<ExternalDonateRedirect/>}/>
      </Routes>
      <Footer/>
      <audio id="ambient-audio" src="/media/ambient-vinyl.mp3" loop preload="auto" />
    </BrowserRouter>
  );
}
