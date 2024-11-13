import Container from "../_components/_ui/container";
import Heading from "../_components/_ui/heading";
import Para from "../_components/_ui/para";
import Section from "../_components/_ui/section";
import { cn } from "@/lib/utils";

export default function Features() {
  return (
    <Section>
      <Container>
        <Heading mainText="Everything you need." subText="In just a Click" />
        <Para className="text-xl mt-4">Payroll, leave, attendance, and expense management in one place.</Para>
        <div className="mt-20 grid grid-cols-2 gap-x-28 gap-y-10">
          {/* <div className="rounded-2xl border border-[#25282c] bg-[#111113]"> */}
          {/*   <div className="relative min-h-[350px] overflow-hidden"> */}
          {/*     <img src="/home/graph-attendance.png" className="absolute inset-0 h-full w-full" /> */}
          {/*     <img */}
          {/*       src="/home/attendance-screen.png" */}
          {/*       className="absolute -bottom-8 right-0 max-w-sm" */}
          {/*     /> */}
          {/*   </div> */}
          {/*   <div className="px-8 pb-8 pt-4"> */}
          {/*     <h1 className="text-xl font-semibold text-white">Attendance Management</h1> */}
          {/*     <Para> */}
          {/*       Monitor employee attendance in real-time, allowing for easy tracking of hours */}
          {/*       worked, absences, and punctuality to optimize workforce management. */}
          {/*     </Para> */}
          {/*   </div> */}
          {/* </div> */}

          <Card
            title="Attendance Management"
            description="Monitor employee attendance in real-time, allowing for easy tracking of hours worked, absences, and punctuality to optimize workforce management."
            bgSrc="/home/graph-attendance.svg"
            screenSrc="/home/attendance-screen.png"
          />
          <Card
            title="Leave Management"
            description="Effortlessly manage employee leave requests with our intuitive system, providing clear visibility and approval workflows to enhance productivity."
            bgSrc="/home/leave-bg.svg"
            screenSrc="/home/leave-screen.png"
            imgClassName="max-w-[95%] -bottom-10 left-1/2 -translate-x-1/2"
          />
          <Card
            title="Payroll Management"
            description="Streamline your payroll process with automated calculations, ensuring timely and accurate payments while maintaining compliance with regulations."
            bgSrc="/home/leave-bg.svg"
            screenSrc="/home/payroll-screen.png"
            imgClassName="max-w-[450px] left-1/2 -translate-x-1/2"
          />
          <Card
            title="Expense Management"
            description="Simplify expense reporting and approvals with our user-friendly tool, enabling employees to submit claims easily while ensuring accurate reimbursement processes."
            bgSrc="/home/payroll-bg.svg"
            screenSrc="/home/expense-screen.png"
            imgClassName="left-0 -translate-x-10"
          />
        </div>
      </Container>
    </Section>
  );
}

interface CardProps {
  title: string;
  description: string;
  bgSrc: string;
  screenSrc: string;
  imgClassName?: string;
}

function Card({ title, description, bgSrc, screenSrc, imgClassName }: CardProps) {
  return (
    <div className="rounded-2xl border border-[#25282c] bg-[#111113]">
      <div className="relative min-h-[350px] overflow-hidden">
        <img src={bgSrc} className={cn("absolute inset-0 h-full w-full")} alt="Background" />
        <img
          src={screenSrc}
          className={cn("absolute -bottom-8 right-0 max-w-sm", imgClassName)}
          alt="Screen"
        />
      </div>
      <div className="px-8 pb-8 pt-8">
        <h1 className="text-xl font-semibold text-white mb-2">{title}</h1>
        <Para>{description}</Para>
      </div>
    </div>
  );
}
