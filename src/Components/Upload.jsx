import React from 'react';
import { FaXmark } from "react-icons/fa6";
import { useRef } from 'react';
import musics from '../Data';

const Upload = (props) => {
    const title = useRef();
    const song = useRef();

    function handleSubmit(){
        const text = title.current.value;
        const file = song.current.files[0];

        if(text.trim()==='' || !file){
            return
        }        
        const fileReader = new FileReader();
    
        fileReader.onload = () => {
          musics.push({Title: text , src: fileReader.result})
        }
    
        fileReader.readAsDataURL(file);
        title.current.value = '';
    }
  return (
    <>
        <div className='x-mark' onClick={props.click}><FaXmark /></div>
        <input type="text" placeholder='Enter the title' className='title-inp' ref={title}/>
        <input type="file" accept='audio/mpeg' multiple ref={song}/>
        <button className='upload' onClick={handleSubmit}>Upload</button>

    </>
  )
}

export default Upload