import * as React from "react"
// Plus removed from lucide-react as it's no longer used

// Calendars removed as no longer used
// DatePicker removed as no longer used
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter, // Removed
  SidebarHeader,
  // SidebarMenu, // Removed
  // SidebarMenuButton, // Removed
  // SidebarMenuItem, // Removed
  // SidebarSeparator, // Removed
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

export function SidebarRight({
  collapsible = "icon", // Default collapsible state, can be overridden by props
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      side="right"
      collapsible={collapsible}
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        {/* DatePicker, Separator, and Calendars are removed from here */}
      </SidebarContent>
      {/* SidebarFooter and its content (New Calendar button) are removed */}
    </Sidebar>
  )
}
