import './App.css';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact'; // Naya form import kiya

function App() {
  return (
    <div className="App bg-light" style={{ minHeight: '100vh', padding: '20px' }}>
      <h1 className="text-center mt-3 fw-bold">My Contact Manager</h1>
      
      {/* Pehle Form dikhayega */}
      <AddContact />
      
      {/* Phir Table dikhayega */}
      <ContactList />
      
    </div>
  );
}

export default App;