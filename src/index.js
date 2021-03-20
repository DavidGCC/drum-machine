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

let record = [];

// const getSoundByKey = key => sounds.find(sound => sound.triggerCode === key);

const playSound = (sound, volume, isRecording) => {
    const soundElem = document.getElementById(sound.id);
    soundElem.currentTime = 0;
    soundElem.volume = volume;
    soundElem.play();
    if (isRecording) {
        const clickTime = new Date();
        record = [...record, {
            clickTime: clickTime.getTime(),
            sound
        }];
        console.log(record);
    }
};

const timeoutArr = [];
const stopRecording = () => timeoutArr.forEach(i => clearTimeout(i));


const playRecording = (recording, volume) => {
    let timeSum = 0;
    stopRecording();
    recording.forEach(async (item, index, arr) => {
        if (index === 0) {
            return null;
        } else {
            const timeToWait = item.clickTime - arr[index - 1].clickTime;
            timeoutArr.push(setTimeout(() => {
                playSound(item.sound, volume, false);
            }, timeSum + timeToWait));
            timeSum += timeToWait;
        }
    });
};



const DrumPad = ({ sound, volume, isRecording, setCurrentPad }) => {
    const [active, setActive] = React.useState(false);
    const pad = React.useRef(null);

    const clickStyle = {
        transform: "scale(0.95)",
        backgroundColor: "rgb(139, 211, 57)",
        boxShadow: "none"
    };

    const buttonStyle = active ? clickStyle : {};
    

    const handleClick = () => {
        setCurrentPad(sound);
        playSound(sound, volume, isRecording);
        setActive(true);
        setTimeout(() => setActive(false), 100);
    };


    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.keyCode === sound.triggerCode) {
                playSound(sound, volume, isRecording);
                setCurrentPad(sound);
                setActive(true);
                setTimeout(() => setActive(false), 100);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isRecording, sound, volume, setCurrentPad]);

    return (
        <div id={`${sound.id}-container`} onClick={handleClick} className="drum-pad" style={buttonStyle} ref={pad}>
            <audio id={sound.id} src={sound.src} />
            {sound.trigger}
        </div>
    );
};

const DrumPads = ({ sounds, volume, isRecording, setCurrentPad }) => {
    return (
        <div id="drum-pads">
            {
                sounds.map(sound => (
                    <DrumPad key={sound.id} sound={sound} volume={volume} isRecording={isRecording} setCurrentPad={setCurrentPad} />
                ))
            }
        </div>
    );
};

const VolumeSlider = ({ volume, setVolume }) => {
    const handleVolumeChange = (e, newVolume) => {
        setVolume(newVolume);
    };
    return (
        <div id="volumeSlider">
            <i className="fas fa-volume-off fa-lg" style={{ marginRight: 10 }}></i>
            <Slider value={volume} onChange={handleVolumeChange} min={0} max={1} step={0.01} />
            <i className="fas fa-volume-up fa-lg" style={{ marginLeft: 10 }}></i>
        </div>
    );
};

const Recorder = ({ isRecording, setIsRecording, volume }) => {
    const toggleIsRecording = () => {
        if (!isRecording) {
            stopRecording();
            record = [{
                clickTime: (new Date()).getTime()
            }];
        }
        setIsRecording(!isRecording);
    };

    return (
        <div id="recorder">
            <div onClick={toggleIsRecording}>
                {
                    isRecording
                        ? <i className="fas fa-square fa-lg square"></i>
                        : <i className="fas fa-circle fa-lg circle"></i>
                }
            </div>
            <div>
                {
                    record.length > 1 && !isRecording 
                        ? <i onClick={() => playRecording(record, volume)} className="fas fa-play fa-lg play"></i>
                        : <i className="fas fa-play fa-lg disabled"></i>
                }
            </div>
        </div>
    );
};

const App = () => {
    const [currentPad, setCurrentPad] = React.useState();
    const [volume, setVolume] = React.useState(0.3);
    const [isRecording, setIsRecording] = React.useState(false);
 
    return (
        <div id="drum-machine">
            <div>
                <DrumPads sounds={sounds} volume={volume} isRecording={isRecording} setCurrentPad={setCurrentPad} />
            </div>
            <div className="utility">
                <h3 id="display">
                    {
                        currentPad?.name
                            ? currentPad?.name
                            : "Start Jamming"
                    }
                </h3>
                <VolumeSlider volume={volume} setVolume={setVolume} />
                <Recorder isRecording={isRecording} setIsRecording={setIsRecording} volume={volume} />
            </div>
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById("root")
);