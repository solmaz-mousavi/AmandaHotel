import { Provider } from "react-redux";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import StaticDataProvider from "./context/StaticContext";
import store from "./app/store";
import Router from "./Router";
import Navbar from "./components/template/navbar/Navbar";
import Header from "./components/template/header/Header";
import Footer from "./components/template/footer/Footer";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <Provider store={store}>
      <StaticDataProvider>
        <AuthProvider>
          <CartProvider>
            <Header />
            <Navbar />
            <Router />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </StaticDataProvider>
    </Provider>
  );
}

export default App;
