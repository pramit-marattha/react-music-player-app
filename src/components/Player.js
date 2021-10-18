import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

function Player(props) {
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  });

  const SkipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <>
      <div className="music-player">
        <p>
          <div className="text-anim">
            <strong>Upcoming Song:</strong>
          </div>

          <div className="nextsong-details">
            <img
              src={props.songs[props.nextSongIndex].img_src}
              alt={props.songs[props.nextSongIndex].title}
              style={{ width: "4em", height: "auto" }}
            />
            <p>
              <b>{props.songs[props.nextSongIndex].title} </b>&nbsp; by &nbsp;
              <b>{props.songs[props.nextSongIndex].artist}</b>&nbsp; from album
              &nbsp;
              <b>{props.songs[props.nextSongIndex].album}</b>
            </p>
          </div>
        </p>
        <audio
          src={props.songs[props.currentSongIndex].src}
          ref={audioElement}
        ></audio>

        <PlayerDetails song={props.songs[props.currentSongIndex]} />
        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          SkipSong={SkipSong}
        />

        {/* <h4>Lofi Music Player React </h4> */}
      </div>
    </>
  );
}
export default Player;
