import "./App.css";
import { Body } from "./pages/Body/Body";
import { Footer } from "./common/Footer/Footer";
import { Header } from "./common/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default App;
