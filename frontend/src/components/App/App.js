import './App.css';
import Main from '../Main';
import Nav from '../Nav';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../Common';

function App() {
  return (
<div>
  <BrowserRouter>
  <AuthProvider>
  <Nav />
  <Main />
  </AuthProvider>
  
  </BrowserRouter>

</div>
  );
}

export default App;
