import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { Slider } from "@material-ui/core";

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

const getSoundByKey = key => sounds.find(sound => sound.triggerCode === key);


const DrumPad = ({ sound, playSound }) => {
    return (
        <div onClick={playSound} className="drum-pad">
            <audio id={sound.id} src={sound.src} />
            {sound.trigger}
        </div>
    );
};

const DrumPads = ({ sounds, playSound }) => {
    return (
        <div id="drum-pads">
            {
                sounds.map(sound => (
                    <DrumPad key={sound.id} sound={sound} playSound={() => playSound(sound)} />
                ))
            }
        </div>
    );
};

const App = () => {
    const [currentPad, setCurrentPad] = React.useState();
    const [volume, setVolume] = React.useState(0.2);
    const playSound = (sound) => {
        setCurrentPad(sound);
        const soundElem = document.getElementById(sound.id);
        soundElem.currentTime = 0;
        soundElem.volume = volume;
        soundElem.play();
    };

    const handleKeyDown = e => {
        // e.preventDefault();
        switch (e.keyCode) {
            case 81:
                playSound(getSoundByKey(81));
                break;
            case 87:
                playSound(getSoundByKey(87));
                break;
            case 69:
                playSound(getSoundByKey(69));
                break;
            case 65:
                playSound(getSoundByKey(65));
                break;
            case 83:
                playSound(getSoundByKey(83));
                break;
            case 68:
                playSound(getSoundByKey(68));
                break;
            case 90:
                playSound(getSoundByKey(90));
                break;
            case 88:
                playSound(getSoundByKey(88));
                break;
            case 67:
                playSound(getSoundByKey(67));
                break;
            default:
                return null;
        }
    };

    const handleVolumeChange = (e, newVolume) => {
        e.preventDefault();
        setVolume(newVolume);
    };

    React.useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
    });

    return (
        <div id="drum-machine"  onKeyDown={handleKeyDown}>
            <div>
                <DrumPads sounds={sounds} playSound={playSound} volume={volume} />
            </div>
            <div className="utility">
                <h3 id="display">{currentPad?.name}</h3>
                <Slider value={volume} onChange={handleVolumeChange} min={0} max={1} step={0.01} />
            </div>
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById("root")
);