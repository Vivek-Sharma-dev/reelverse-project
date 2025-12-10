import Header from "./Components/header/Header";
import Footer from "./Components/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
const App = () => {
  return (
    <div className="bg-slate-900 text-white min-h-[50%]">
      <Header />
      <ScrollToTop />
        <main className="min-h-screen">
          <Outlet />
        </main>
      <Footer />
    </div>
  );
};

export default App;
