import './App.css';
import Main from './components/Main/Main'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import {BrowserRouter} from  'react-router-dom'
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Main/>
      </BrowserRouter>
    </div>
  );
}

export default App;
