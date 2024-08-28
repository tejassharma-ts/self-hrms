import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const jobSeekers = [
  { id: 1, name: "Alice Johnson", role: "Frontend Developer" },
  { id: 2, name: "Bob Smith", role: "UX Designer" },
  { id: 3, name: "Charlie Brown", role: "Backend Engineer" },
  { id: 4, name: "Diana Ross", role: "Product Manager" },
  { id: 5, name: "Ethan Hunt", role: "DevOps Engineer" },
  { id: 6, name: "Fiona Apple", role: "Data Scientist" },
  { id: 7, name: "George Clooney", role: "UI Designer" },
  { id: 8, name: "Hannah Montana", role: "Full Stack Developer" },
]

export default function NewHiresCard() {
  return (
    <Card className="w-full h-48 max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2 px-4">
        <CardTitle className="text-[21px] font-bold">New Hires</CardTitle>
        <Button variant="ghost" className="text-[11px]">
          View more
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className=" h-28 w-full pr-4">
          {jobSeekers.map((seeker) => (
            <div key={seeker.id} className="flex items-center justify-between mb-4 last:mb-0">
              <div>
                <h3 className="font-semibold">{seeker.name}</h3>
                <p className="text-sm text-gray-500">{seeker.role}</p>
              </div>
              <Button variant="outline" size="sm">
                Send
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}