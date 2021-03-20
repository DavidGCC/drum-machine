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

const getSoundByKey = key => sounds.find(sound => sound.triggerCode === key);

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

const sleep = time => {
    const date = new Date();
    let currentDate = null;
    do {
        currentDate = new Date();
    } while (currentDate - date < time);
};

const timeoutArr = [];
const stopRecording = () => timeoutArr.forEach(i => clearTimeout(i));
const playRecording = (recording) => {
    let timeSum = 0;
    stopRecording();
    recording.forEach(async (item, index, arr) => {
        if (index === 0) {
            return null;
        } else {
            const timeToWait = item.clickTime - arr[index - 1].clickTime;
            console.log(`playing ${item.sound.name} on ${timeToWait}`);
            timeoutArr.push(setTimeout(() => playSound(item.sound, 0.4, false), timeSum + timeToWait));
            timeSum += timeToWait;
            // sleep(timeToWait);
            // playSound(item.sound, 0.4, false);
        }
    });
};



const DrumPad = ({ sound, volume, isRecording }) => {
    return (
        <div onClick={() => playSound(sound, volume, isRecording)} className="drum-pad">
            <audio id={sound.id} src={sound.src} />
            {sound.trigger}
        </div>
    );
};

const DrumPads = ({ sounds, volume, isRecording }) => {
    return (
        <div id="drum-pads">
            {
                sounds.map(sound => (
                    <DrumPad key={sound.id} sound={sound} volume={volume} isRecording={isRecording} />
                ))
            }
        </div>
    );
};

const VolumeSlider = ({ volume, setVolume }) => {
    const handleVolumeChange = (e, newVolume) => {
        e.preventDefault();
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

const Recorder = ({ isRecording, setIsRecording }) => {
    const toggleIsRecording = () => {
        if (!isRecording) {
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
                        ? <i className="fas fa-square square"></i>
                        : <i className="fas fa-circle circle"></i>
                }
            </div>
            <div onClick={() => playRecording(record)}>
                {
                    record.length > 1 && !isRecording 
                        ? <i className="fas fa-play play"></i>
                        : <i className="fas fa-play disabled"></i>
                }
            </div>
        </div>
    );
};

const App = () => {
    const [currentPad, setCurrentPad] = React.useState();
    const [volume, setVolume] = React.useState(0.3);
    const [isRecording, setIsRecording] = React.useState(false);
    React.useEffect(() => {
        const eventListener = (e) => {
            let sound;
            switch (e.keyCode) {
                case 81:
                    sound = getSoundByKey(81);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 87:
                    sound = getSoundByKey(87);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 69:
                    sound = getSoundByKey(69);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 65:
                    sound = getSoundByKey(65);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 83:
                    sound = getSoundByKey(83);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 68:
                    sound = getSoundByKey(68);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 90:
                    sound = getSoundByKey(90);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 88:
                    sound = getSoundByKey(88);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                case 67:
                    sound = getSoundByKey(67);
                    setCurrentPad(sound);
                    playSound(sound, volume, isRecording);
                    break;
                default:
                    return null;
            }
        };
        window.addEventListener("keydown", eventListener);
        return () => {
            window.removeEventListener("keydown", eventListener);
        };
    }, [volume, isRecording]);

    return (
        <div id="drum-machine">
            <div>
                <DrumPads sounds={sounds} volume={volume} isRecording={isRecording} />
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
                <Recorder isRecording={isRecording} setIsRecording={setIsRecording} />
            </div>
        </div>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById("root")
);