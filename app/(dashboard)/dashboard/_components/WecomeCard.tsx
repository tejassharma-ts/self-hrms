import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WelcomeCard() {
  return (
    <Card className="w-full max-w-md h-48 mx-auto overflow-hidden relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=256&width=384')" }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <CardContent className="relative z-10 flex flex-col h-full p-6">
        <div className="flex-grow">
          <h2 className="text-[21px] font-bold text-white">Hello!! Aditya Singh</h2>
          <p className="text-[10px] text-white mb-6">Thursday, 22 August 2024</p>
        </div>
        <Button variant="outline" className="self-start rounded-xl border-white hover:bg-white text-black transition-colors">
          Check in
        </Button>
      </CardContent>
    </Card>
  )
}