import Features from "../components/home/features";
import Hero from "../components/home/hero";
import Testimonials from "../components/home/testimonials";
import CTA from "../components/home/callToAction";
import Footer from "../components/home/footer";
function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}

export default Home;
