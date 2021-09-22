
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Header from './components/headers/Header.js'
import MainPages from './components/mainpages/Pages'


function App() {
  return (
    <DataProvider>
      <BrowserRouter>
       <div className="App">
          <Header />
          <MainPages />
       </div>
     </BrowserRouter>
    </DataProvider>
  );
}

export default App;
