import { useEffect, useState } from 'react';
import './App.css'

function App() {

  const [videos, setVideos] =             useState([]);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '')
    .then(x => x.json())
    .then(x => setVideos(x))
  }, []);
  
  useEffect(() => {
    Promise.all(videos.map((e) => title(e))).then(x => setDescriptions(x));
  }, [videos]);
  
  const deleteVideo = (e) => {
    fetch(import.meta.env.VITE_API_URL + '/delete/' + e, {
      method: 'DELETE',
    })
    .then(x => x.json())
    .then(x => setVideos(x))
  }

  const handleChange = (e) => {
    if (e?.target?.files?.length) {
      const fd = new FormData();
      fd.append('file', e.target.files[0]);
      
      fetch(import.meta.env.VITE_API_URL + '/upload', {
        method: 'POST',
        body:   fd,
      })
      .then(x => x.json())
      .then(x => setVideos(x))
      .catch(e => console.log('error caught: ', e))
    }
  }

  const title = async (e) => await fetch(import.meta.env.VITE_API_URL + '/video/' + e + '.txt')
                        .then(x => x.json())
                        .then(x => x?.video_description?.response)
                        .catch(err => 'Analyzing...')

  return (
    <>
      <h1>video-analyser</h1>
      <input type="file" accept="video/mp4" onChange={handleChange}/>
      { 
        !!videos.length && (
          <ul>
            {
              videos.map((e, i) => (
                <li key={i} onClick={() => deleteVideo(e)}>
                  <video controls title={descriptions[i]}>
                    <source src={import.meta.env.VITE_API_URL + '/video/' + e} type='video/mp4'/>
                  </video> 
                </li>
              ))
            }
          </ul>
        )
      }
    </>
  )
}

export default App
