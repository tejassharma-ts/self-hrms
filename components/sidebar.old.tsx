'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronDown, ChevronUp, Home, Settings, Users, BarChart, Files } from "lucide-react"
import { useRouter } from 'next/navigation'

type Route = {
  name: string
  path: string
  icon: React.ReactNode
  subRoutes?: { name: string; path: string }[],
}

const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: 'Users',
    path: '/users',
    icon: <Users className="h-4 w-4" />,
    subRoutes: [
      { name: 'All Users', path: '/users' },
      { name: 'Add User', path: '/users/add' },
    ],
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: <BarChart className="h-4 w-4" />,
    subRoutes: [
      { name: 'Sales Report', path: '/reports/sales' },
      { name: 'User Activity', path: '/reports/activity' },
    ],
  },
  {
    name: 'Documents',
    path: '/documents',
    icon: <Files className="h-4 w-4" />,
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings className="h-4 w-4" />,
  },
]

export default function Sidebar() {
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([])
  const [selectedRoute, setSelectedRoute] = useState<string>('')
  const router = useRouter()

  const toggleRoute = (routeName: string) => {
    setExpandedRoutes(prev =>
      prev.includes(routeName)
        ? prev.filter(name => name !== routeName)
        : [...prev, routeName]
    )
  }

  const handleRouteClick = (routeName: string, path: string) => {
    setSelectedRoute(routeName)
    router.push(path)
  }

  return (
    <div className="flex h-screen w-64 flex-col fixed left-0">
      <div className="flex items-center space-x-2 p-4 bg-white">
        {/* <img */}
        {/*   alt="Company logo" */}
        {/*   className="h-8 w-8 rounded-full" */}
        {/*   src="/placeholder.svg" */}
        {/*   style={{ */}
        {/*     aspectRatio: "32/32", */}
        {/*     objectFit: "cover", */}
        {/*   }} */}
        {/* /> */}
        <h2 className="text-lg font-semibold">Acme Inc.</h2>
      </div>
      <Separator className="mx-auto w-4/5" />
      <ScrollArea className="flex-1">
        <nav className="p-2">
          {routes.map((route) => (
            <div key={route.name} className="mb-1">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  className={`w-full justify-start transition-colors ${
                    selectedRoute === route.name
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-200'
                  }`}
                  onClick={() => handleRouteClick(route.name, route.path)}
                >
                  {route.icon}
                  <span className="ml-2 flex-1 text-left">{route.name}</span>
                </Button>
                {route.subRoutes && (
                  <Button
                    variant="ghost"
                    className="ml-2"
                    onClick={() => toggleRoute(route.name)}
                  >
                    {expandedRoutes.includes(route.name) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              {route.subRoutes && expandedRoutes.includes(route.name) && (
                <div className="ml-4 mt-1 space-y-1">
                  {route.subRoutes.map((subRoute) => (
                    <Button
                      key={subRoute.name}
                      variant="ghost"
                      className={`w-full justify-start pl-8 text-sm transition-colors ${
                        selectedRoute === subRoute.name
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-200'
                      }`}
                      onClick={() => handleRouteClick(subRoute.name, subRoute.path)}
                    >
                      {subRoute.name}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
