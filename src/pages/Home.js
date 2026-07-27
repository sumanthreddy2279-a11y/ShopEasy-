import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/hero/Hero";
import TrendingProducts from "../components/TrendingProducts/TrendingProducts";
import WhyChoose from "../components/WhyChoose/WhyChoose";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrendingProducts />
       <WhyChoose />
         <Newsletter />
      <Footer />

    </>
  );
}

export default Home;