import './App.css';
import Main from '../Main';
import Nav from '../Nav';
import { AuthProvider, ModeProvider,LanguageProvider } from '../Common';

function App() {
  return (
<div>
  <AuthProvider>
    <ModeProvider>
      <LanguageProvider>
        <Nav />
        <Main />
      </LanguageProvider>
    </ModeProvider>
  </AuthProvider>
</div>
  );
}

export default App;
