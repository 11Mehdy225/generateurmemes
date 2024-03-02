import './App.css';
import Form from './composants/Form';
import Header from './composants/Header';

//composant principal cest lui qui englobe tout les autres composants
function App() {
  return (
   <div className='App'>
    <Header/>
    <Form/>
   </div>
  );
}

export default App;
