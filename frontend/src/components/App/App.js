import './App.css';
import Main from '../Main';
import Nav from '../Nav';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
<div>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"/>
  <BrowserRouter>
  <Nav />
  <Main />
  
  </BrowserRouter>

</div>
  );
}

export default App;
