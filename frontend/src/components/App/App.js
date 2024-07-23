import './App.css';
import Main from '../Main';
import Nav from '../Nav';
import { AuthProvider, ModeProvider } from '../Common';

function App() {
  return (
<div>
  <AuthProvider>
    <ModeProvider>
      <Nav />
      <Main />
    </ModeProvider>
  </AuthProvider>
</div>
  );
}

export default App;
