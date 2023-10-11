import { BrowserRouter as Router } from 'react-router-dom';
import './styles/main.css';
import AppRouter from './components/AppRouter';
import Header from './components/UI/header/Header';
import Footer from './components/UI/footer/Footer';

function App() {
  return (
 <>
    <Router>
      <Header/>
      <AppRouter/>
      <Footer/>
    </Router>
    
  
 </>
  
  );
}

export default App;
