
import { useEffect, useState } from 'react';
import './App.css';
import storiesData from "./stories"

function App() {
  const [index, setIndex] = useState(0)
  const [currentStory, setCurrentStory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    if(currentStory){
      const timer = setTimeout(()=>{
        goNext()
      },5000)
      return ()=>clearTimeout(timer)
    }
  },[index, currentStory])

  console.log(storiesData)
  const openStory = (i) => {
    setIndex(i)
    setCurrentStory(storiesData[i])
  }
  const goPrev = () => {
    if (index > 0) {
      setIndex(index - 1)
      setCurrentStory(storiesData[index - 1])
    }else{
      closeStory()
    }
  }
  const closeStory = () => {
    setCurrentStory(null)
  }
  const goNext = () => {
    if (index < storiesData.length - 1) {
      setIndex(index + 1)
      setCurrentStory(storiesData[index + 1])
    } else {
      closeStory()
    }
  }
  const handleTap = (e) => {
    console.log(e)
    const x = e.clientX;
    const width = window.innerWidth
    console.log(width, x)
    if (x < width / 2) {
      goPrev()
    } else {
      goNext()
    }
  }
  return (
    <div>
      <h1>Instagram story</h1>
      <div className='story-list'>
        
          {storiesData.map((story, i) =>
            <img key={i} src={story.image} alt='story'
              onClick={() => openStory(i)} />
          )}
        
      </div>
      {currentStory &&<> 
      <div onClick={handleTap} className='story-view'
      >
        <button className='btn-close'
        onClick={(e)=>{
          e.stopPropagation()
          closeStory()
          }}>X</button>
        {loading && <p style={{color:"white",position:"absolute"}}>Loading...</p>}
        <img key={index} src={currentStory.image} alt='Current Story' 
        className='story-img'
        onLoad={()=>setLoading(false)} />
        
      </div>
      </>}
    </div>

  );
}

export default App;
