import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './redux/store'; 
import Home from './pages/Home';
import Header from './components/Header';
import Login from "./pages/Login";
import Footer from "./components/Footer";
import LoginForm from './components/user/LoginForm';
import SingleProduct from './pages/SingleProduct';


const App = () => {

  return (
    <Provider store={store}> {/* 使用Provider包裹应用，并传递store */}
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/header" element={<Header />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/loginForm" element={<LoginForm/>} />
            <Route path='/products/:id' element={<SingleProduct />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
