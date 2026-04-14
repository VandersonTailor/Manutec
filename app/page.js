import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import BudgetForm from "@/components/BudgetForm";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Hero />
        <About />
        <Services />
        <Differentials />
        <BudgetForm />
        <Contact />
      </main>
      <WhatsAppFloat />
    </>
  );
}
