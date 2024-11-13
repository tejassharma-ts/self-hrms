import Container from "../_components/_ui/container";
import Heading from "../_components/_ui/heading";
import Para from "../_components/_ui/para";
import Section from "../_components/_ui/section";
import { HeartHandshake, ChartNoAxesCombined } from "lucide-react";

export default function AppShowcase() {
  return (
    <Section>
      <Container>
        <Heading mainText="Your Employee app" />
        <Para className="text-xl mt-4">Manage everything with just a click</Para>

        <div className="mt-20 flex flex-col gap-8">
          <div className="rounded-2xl border border-[#25282c] bg-[#111113]">
            <div className="relative overflow-hidden px-8">
              <div className="grid translate-y-8 grid-cols-5 gap-12">
                <img src="/home/app-screens/phone-screen-1.png" className="max-h-full max-w-full" />
                <img
                  src="/home/app-screens/phone-screen-2.png"
                  className="max-h-full max-w-full translate-y-8"
                />
                <img src="/home/app-screens/phone-screen-3.png" className="max-h-full max-w-full" />
                <img
                  src="/home/app-screens/phone-screen-4.png"
                  className="max-h-full max-w-full translate-y-8"
                />
                <img src="/home/app-screens/phone-screen-5.png" className="max-h-full max-w-full" />
              </div>
            </div>
            <div className="px-8 pb-8 pt-8">
              <h1 className="text-xl font-semibold text-white mb-2">For all your employees</h1>
              <Para>
                With our HRM app, employees can easily manage their profiles, submit leave requests,
                track attendance,
                <br />
                view payslips, and access training resources, all while staying connected with their
                team.
              </Para>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="rounded-2xl border border-[#25282c] bg-[#111113] p-8">
              <div className="relative overflow-hidden">
                <HeartHandshake size={50} className="stroke-white" />
              </div>
              <div className="pt-16">
                <h1 className="text-xl font-semibold text-white mb-2">Trust and Security</h1>
                <Para>
                  Trust and security are at the core of everything we do at Mployeclick. Built on
                  our own resilient cloud infrastructure, we implement industry-leading security
                  measures to ensure your data is safeguarded and protected around the clock.
                </Para>
              </div>
            </div>

            <div className="rounded-2xl border border-[#25282c] bg-[#111113] p-8">
              <div className="relative overflow-hidden">
                <ChartNoAxesCombined size={50} className="stroke-white" />
              </div>
              <div className="pt-16">
                <h1 className="text-xl font-semibold text-white mb-2">Increased business agility</h1>
                <Para>
                  As your company evolves, so do the skills required, employee locations, and
                  operational dynamics. We adapt seamlessly to these changes, providing accurate,
                  and real-time visibility of your global workforce to enhance decision-making.
                </Para>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
