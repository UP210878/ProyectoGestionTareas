import './App.css';
import Main from '../Main';
import Nav from '../Nav';
import { AuthProvider } from '../Common';

function App() {
  return (
<div>
  <AuthProvider>
  <Nav />
  <Main />
  </AuthProvider>
</div>
  );
}

export default App;
