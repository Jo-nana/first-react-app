import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


// App component that render the entire app
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}/>  {/* Home page // index match the parent path */}
        <Route path="shop/*" element={<Shop />}/>  {/* Shop page // * means match shop with anything and render shop page*/}
        <Route path="auth" element={<Authentication />}/> {/* Sign in page */}
        <Route path="checkout" element={<Checkout />}/> {/* Checkout page */}
      </Route>
    </Routes>
  );
};

export default App;
