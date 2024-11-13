import Nav from "./_components/nav";
import Hero from "./_sections/hero";
import Features from "./_sections/features";
import Showcase from "./_sections/showcase";
import AppShowcase from "./_sections/app-showcase";
import Footer from "./_components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090B]">
      <div
        style={{
          background: "radial-gradient(ellipse at top, rgba(94, 176, 239, 0.5), #09090B 60%)",
        }}
        className="absolute left-1/2 h-[500px] w-[1200px] -translate-x-1/2 rounded-[0_0_50%_50%_/_0_0_100%_100%]"
      />
      <Nav />
      <Hero />
      <Showcase />
      <Features />
      <AppShowcase />
      <Footer />
    </main>
  );
}
