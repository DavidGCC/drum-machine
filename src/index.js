import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

const sounds = [
    {
        trigger: "Q",
        triggerCode: 81,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
        name: "Heater 1",
        id: "heater-1"
    },
    {
        trigger: "W",
        triggerCode: 87,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
        name: "Heater 2",
        id: "heater-2"
    },
    {
        trigger: "E",
        triggerCode: 69,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
        name: "Heater 3",
        id: "heater-3"
    },
    {
        trigger: "A",
        triggerCode: 65,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
        name: "Heater 4",
        id: "heater-4"
    },
    {
        trigger: "S",
        triggerCode: 83,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
        name: "Clap",
        id: "clap"
    },
    {
        trigger: "D",
        triggerCode: 68,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
        name: "Open HH",
        id: "open-hh"
    },
    {
        trigger: "Z",
        triggerCode: 90,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
        name: "Kick n' Hat",
        id: "kick-n'-hat"
    },
    {
        trigger: "X",
        triggerCode: 88,
        src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
        name: "Kick",
        id: "kick"
    },
    {
        trigger: "C",
        triggerCode: 67,
        src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
        name: "Closed HH",
        id: "closed-hh"
    },
];

const App = () => {
    const playSound = (e) => {
        e.preventDefault();
        const sound = document.getElementById("1");
        sound.currentTime = 0;
        sound.play();
    };

    return (
        <div>
            <button className="btn btn-danger" onClick={playSound}>
                <audio id="1" src="/Sounds/hi-hat-2.mp3"></audio>
                play
            </button>
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById("root")
);