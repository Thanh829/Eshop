import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";

const App = () => {
  return (
    <Router>
      <Header></Header>
      <Container>
        <main className='py-3'>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/product/:id' component={ProductScreen} ></Route>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/profile' component={ProfileScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path='/order/:orderId' component={OrderDetailsScreen}></Route>
        </main>
      </Container>

      <Footer></Footer>
    </Router>
  );

}

export default App;
