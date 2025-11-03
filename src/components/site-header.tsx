import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import logo from "../../public/logo.png";
import Image from "next/image";
import { IconBell } from "@tabler/icons-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 overflow-hidden">
            <Image src={logo} alt="Logo" fill />
          </div>
          <span className="font-semibold bg-linear-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            PHCareHub
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <IconBell className="w-5 h-5" />
          </button>
          <Button variant="outline" size="sm" asChild>
            <a href="/docs" className="dark:text-foreground">Docs</a>
          </Button>
          <button className="flex items-center gap-2 rounded-md bg-gray-200 px-3 py-1 dark:bg-gray-800">
            <span>Anik</span>
            {/* <Image
              src="/doctors/doctor-1.jpg"
              alt="Anik"
              width={24}
              height={24}
              className="rounded-full"
            /> */}
          </button>
        </div>


      </div>
    </header>
  )
}
