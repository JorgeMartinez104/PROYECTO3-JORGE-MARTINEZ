import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './components/Index'
import Historial from './components/Historial'


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;
