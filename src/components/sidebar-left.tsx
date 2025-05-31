"use client";

import * as React from "react";
import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";

import { CustomLogo } from "@/components/custom-logo";
import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useHealthCheck } from "@/hooks/queries/use-api";
import useChatActions from "@/hooks/useChatActions";
import { usePlaygroundStore } from "@/store";
import { AgentSection, Endpoint, NewChatButton } from "./playground/Sidebar/Sidebar";
import Sessions from "./playground/Sidebar/Sessions";

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  const data = {
    teams: [
      {
        name: "finley",
        logo: CustomLogo,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      }
    ],
    navMain: [
      {
        title: "Home",
        url: "#",
        icon: Home,
        isActive: true,
      },
      {
        title: "Search",
        url: "#",
        icon: Search,
      },
      {
        title: "Ask AI",
        url: "#",
        icon: Sparkles,
      },
      {
        title: "Inbox",
        url: "#",
        icon: Inbox,
        badge: "10",
      },
    ]
  };

  const { clearChat, focusChatInput, initializePlayground } = useChatActions()
  const { messages, selectedEndpoint, isEndpointActive, hydrated } = usePlaygroundStore()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
    if (hydrated) initializePlayground()
  }, [selectedEndpoint, initializePlayground, hydrated])

  const handleNewChat = () => {
    clearChat()
    focusChatInput()
  }

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NewChatButton
          disabled={messages.length === 0}
          onClick={handleNewChat}
        />
        {isMounted && (
          <>
            <Endpoint />
            <AgentSection />
            {isEndpointActive && <Sessions />}
          </>
        )}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
