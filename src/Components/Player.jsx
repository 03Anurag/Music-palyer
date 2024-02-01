import React from 'react';
import { MdFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { TbPlayerTrackPrevFilled } from "react-icons/tb";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaPlay } from "react-icons/fa";
import { GiPauseButton } from "react-icons/gi";
import { FaXmark } from "react-icons/fa6";
import Image from '../Musics/Image.jpg'
import { useRef, useState } from 'react';
import Upload from './Upload';
import musics from '../Data';

const Player = () => {
  const [play, setPlay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currSong, setcurrSong] = useState(0);
  const [playlist, showPlaylist] = useState(false);
  const [upload , showUpload] = useState(false)
  const music = useRef();


  function handlePlay() {
    setPlay(prev => !prev);
  }

  function onPlaying() {
    const duration = music.current.duration;
    const currentTime = music.current.currentTime;

    setProgress(currentTime / duration * 100);

  }

  function handleNext() {
    const index = musics.length;
    if (currSong < index - 1) {
      setcurrSong(prev => prev + 1)
    } else {
      setcurrSong(0);
    }
  }
  function handlePrev() {
    const index = musics.length - 1;
    if (currSong > 0) {
      setcurrSong(prev => prev - 1)
    } else {
      setcurrSong(index);
    }
  }

  if (play) {
    music.current?.play()
  } else {
    music.current?.pause()
  }

  function handleSlide() {
    showPlaylist(true);
  }

  function handleUpload() {
    showUpload(true);
  }

  function handlenoUpload(){
    showUpload(false);
  }

  function handleStart(index){
    setcurrSong(index);
    setPlay(true);
  }
  return (
    <>
      <div className="music-player">
        <nav>
          <div className="circle" onClick={handleUpload}>
            <MdFileUpload />
          </div>
          <div className="circle" onClick={handleSlide}>
            <GiHamburgerMenu />
          </div>
        </nav>

        <div className={`form ${upload ? 'active-form' : undefined}`}>
          <Upload click = {handlenoUpload}/>
        </div>

        <div className="disc">
          <img src={Image} alt="Headphone" />
        </div>

        <h1>{musics[currSong].Title}</h1>

        <audio src={musics[currSong].src} ref={music} onTimeUpdate={onPlaying}></audio>
        <div className="progress">
          <div className="bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="controls">
          <div onClick={handlePrev}><TbPlayerTrackPrevFilled /></div>
          <div onClick={handlePlay}>{play ? <GiPauseButton /> : <FaPlay />}</div>
          <div onClick={handleNext}><TbPlayerTrackNextFilled /></div>
        </div>

        <ul className={`playlist ${playlist ? 'active' : undefined}`}>
          <div onClick={() => showPlaylist(false)} className='x-mark'><FaXmark /></div>
          {musics.map((song, index) => (
            <li key={index} onClick={() => handleStart(index)}><h3>{song.Title}</h3></li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Player