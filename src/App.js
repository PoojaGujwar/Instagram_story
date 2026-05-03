
import { useEffect, useState } from 'react';
import './App.css';
import storiesData from "./stories"
import 'bootstrap/dist/css/bootstrap.min.css';

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
    const touch = e.touches?e.touches[0]:e
    console.log(e.touches?e.touches[0]:e)
     const x = touch.clientX;
    const width = window.innerWidth
   // console.log(width, x)
    if (x < width / 2) {
      goPrev()
    } else {
      goNext()
    }
  }
  return (
    <div>
      <h4 className='mt-3 mb-5  text-center'>Instagram story</h4>
        <div className='story-list'>
          {storiesData.map((story, i) =>
          <>
     
          <span>{story.username}</span>
            <img key={i} src={story.image} alt='story'
              onClick={() => openStory(i)} />
              
              </>
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
        <div className='card'>
          <div className='card-header text-center'>
             <h3 className='card-title'>{currentStory.username}</h3>
          </div>
          <div className='card-body'>
 <img src={currentStory.image} alt='Current Story' 
        className='story-img'
        onLoad={()=>setLoading(false)}
         />
          </div>
        </div>
       
       
        
      </div>
      </>}
    </div>

  );
}

export default App;
