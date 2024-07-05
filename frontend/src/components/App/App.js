import './App.css';
import Main from '../Main';
import Nav from '../Nav';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
<div>
  <BrowserRouter>
  <Nav />
  <Main />
  
  </BrowserRouter>

</div>
  );
}

export default App;
