import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import Goals from './pages/Goals'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <Goals 
        idea="Upcycling - Stylische Tasche aus Plastikmüll" 
        description="Sammle so viel Müll wie du in einer Stunde draußen finden kannst und..." 
        benefit="Reduziere Umweltverschmutzung und kreiere ein einzigartiges Accessoire" 
      />
      <Goals 
        idea="Pflanze einen Baum - Für eine grünere Zukunft" 
        description="Setze dich für die Umwelt ein, indem du einen Baum pflanzt und pflegst." 
        benefit="Verbessere die Luftqualität und schaffe Lebensraum für Tiere" 
      />
      <Goals 
        idea="Energie sparen - Schalte unnötige Geräte aus" 
        description="Achte darauf, elektrische Geräte auszuschalten, wenn sie nicht in Gebrauch sind." 
        benefit="Reduziere deinen Energieverbrauch und schone die Umwelt" 
      />  

        
    </>
  )
}

export default App
