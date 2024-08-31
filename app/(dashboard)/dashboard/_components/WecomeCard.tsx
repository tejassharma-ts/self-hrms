import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatTodaysDate } from "@/lib/utils"
import { delay } from "@/lib/utils"

export default async function WelcomeCard() {
  // fetch the admin data
  // await delay(2000);

  return (
    <Card className="w-full max-w-md h-48 mx-auto overflow-hidden relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=256&width=384')" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <CardContent className="relative z-10 flex flex-col h-full p-6">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white">Hello!! Aditya Singh</h2>
          <p className="text-sm text-white mb-6">{formatTodaysDate()}</p>
        </div>
        <Button variant="secondary" className="self-start">
          Check in
        </Button>
      </CardContent>
    </Card>
  )
}
