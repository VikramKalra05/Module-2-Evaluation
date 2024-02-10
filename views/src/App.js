import './App.css';
import Navbar from './component/navbar/Navbar';
import AllRoutes from './routes/AllRoutes';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <AllRoutes />
      </div>
    </div>
  );
}

export default App;
