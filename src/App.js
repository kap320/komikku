import { Chapter } from './Pages/Chapter'
import Detail from './Pages/Detail'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotFound } from './Pages/NotFound'

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:type/:title' element={<Detail />} />
          <Route path='/:type/:title/ch/:endpoint' element={<Chapter />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
  )
}

export default App
