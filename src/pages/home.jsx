import Features from "../components/home/features";
import Hero from "../components/home/hero";
import Testimonials from "../components/home/testimonials";
import CTA from "../components/home/callToAction";
import Footer from "../components/home/footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("cvb_token");
    if (token) {
      navigate("/app");
    }
  }, [navigate]);
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
