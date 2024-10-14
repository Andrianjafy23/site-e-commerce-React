import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';  
import Head from './Componnent/Head';
import Animé from './Componnent/Animé';
import Pied from './Componnent/Pied';
import Body from './Componnent/Body';
import Admin from './Componnent/Admin';

const Home = () => (
  <div className='lo'>
    <Animé />
    <Pied />
  </div>
);
 
const Bod = () => (
  <div className='bodyy'>
    <Body/>
    <Pied/>
  </div>
)

function App() {
  return (
    <Router>
      <div className="App">
        <Head />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/body" element={<Bod />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
