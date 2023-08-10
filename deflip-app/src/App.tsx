import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom';
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import RewardsPage from './pages/Rewards/Rewards';
// function App() {
//   return (
//     <div className="App">
//       <Home />
//     </div>
//   );
// }
const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Rewards" element={<RewardsPage/>} />
         
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
