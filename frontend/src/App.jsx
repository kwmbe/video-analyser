import './App.css'

function App() {
  const handleChange = (e) => {
    // console.log(e);
    if (e?.target?.files?.length) {
      const fd = new FormData();
      fd.append('file', e.target.files[0]);
      
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body:   fd,
      })
      .then(res => console.log('response', res))
      .catch(e => console.log('error caught: ', e))
    }
  }

  return (
    <>
      <h1>video-analyser</h1>
      <input type="file" accept="video/mp4" onChange={handleChange}/>
    </>
  )
}

export default App
