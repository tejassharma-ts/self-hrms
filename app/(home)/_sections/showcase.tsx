import Container from "../_components/_ui/container";
import Section from "../_components/_ui/section";

const qualities = [
  {
    title: "Personalized Service",
    brief:
      "Empowering 110+ companies to enhance efficiency, employee engagement, and  strategic growth.",
  },
  {
    title: "Lifetime Support",
    brief: "Join the ranks of 4,000+ registered employees  with our comprehensive HRM solutions!",
  },
  {
    title: "Certified Quality",
    brief: "With 99.99% of the work completed, we're just a step away from achieving excellence!",
  },
];

export default function Showcase() {
  return (
    <Section>
      <div className="relative flex justify-center">
        <div className="relative max-w-5xl">
          <div className="absolute bottom-0 max-w-sm -translate-x-1/2 translate-y-[20%]">
            <img src="/home/add-event.png" />
          </div>
          <img src="/home/dashboard-screen.png" />
          <div className="absolute right-0 top-0 max-w-[20rem] translate-x-1/2 translate-y-[40%]">
            <img src="/home/announcement.png" />
          </div>
        </div>
      </div>
      <Container>
        <div className="bg-[#171820]/70 mt-48 grid grid-cols-3 divide-x divide-[#24272a] rounded-md border border-[#24272a] py-6">
          {qualities.map((quality, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center px-10 py-6 focus:outline-none focus:ring">
                <h2 className="mb-4 text-center text-4xl font-bold text-white">100+</h2>
                <p className="flex-1 text-center text-base text-[#cbd5e1]">{quality.brief}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
