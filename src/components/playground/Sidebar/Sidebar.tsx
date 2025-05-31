'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQueryState } from 'nuqs'
import { LucideArrowDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { isValidUrl, truncateText } from '@/lib/utils'
import { getProviderIcon } from '@/lib/modelProvider'
import { toast } from 'sonner'
import { usePlaygroundStore } from '@/store'
import useChatActions from '@/hooks/useChatActions'
import { AgentSelector } from '@/components/playground/Sidebar/AgentSelector'
import Sessions from './Sessions/Sessions'

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
  SidebarProvider
} from '@/components/ui/sidebar'

const ENDPOINT_PLACEHOLDER = 'NO ENDPOINT ADDED'

const FinleySidebarHeader = () => (
  <div className="flex items-center gap-2 px-3 py-2">
    <LucideArrowDown className="size-4" />
    <span className="text-xs font-medium uppercase text-white">Finley</span>
  </div>
)

const NewChatButton = ({
  disabled,
  onClick
}: {
  disabled: boolean
  onClick: () => void
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    size="lg"
    className="mx-3 h-9 w-[calc(100%-1.5rem)] rounded-xl bg-primary text-xs font-medium text-background hover:bg-primary/80"
  >
    <LucideArrowDown className="size-4" />
    <span className="uppercase">New Chat</span>
  </Button>
)

const ModelDisplay = ({ model }: { model: string }) => (
  <div className="mx-3 flex h-9 w-[calc(100%-1.5rem)] items-center gap-3 rounded-xl border border-primary/15 bg-accent p-3 text-xs font-medium uppercase text-muted">
    {(() => {
      const icon = getProviderIcon(model)
      return icon ? <LucideArrowDown className="size-4" /> : null
    })()}
    {model}
  </div>
)

const Endpoint = () => {
  const {
    selectedEndpoint,
    isEndpointActive,
    setSelectedEndpoint,
    setAgents,
    setSessionsData,
    setMessages
  } = usePlaygroundStore()
  const { initializePlayground } = useChatActions()
  const [isEditing, setIsEditing] = useState(false)
  const [endpointValue, setEndpointValue] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isRotating, setIsRotating] = useState(false)
  const [, setAgentId] = useQueryState('agent')
  const [, setSessionId] = useQueryState('session')

  useEffect(() => {
    setEndpointValue(selectedEndpoint)
    setIsMounted(true)
  }, [selectedEndpoint])

  const getStatusColor = (isActive: boolean) =>
    isActive ? 'bg-positive' : 'bg-destructive'

  const handleSave = async () => {
    if (!isValidUrl(endpointValue)) {
      toast.error('Please enter a valid URL')
      return
    }
    const cleanEndpoint = endpointValue.replace(/\/$/, '').trim()
    setSelectedEndpoint(cleanEndpoint)
    setAgentId(null)
    setSessionId(null)
    setIsEditing(false)
    setIsHovering(false)
    setAgents([])
    setSessionsData([])
    setMessages([])
  }

  const handleCancel = () => {
    setEndpointValue(selectedEndpoint)
    setIsEditing(false)
    setIsHovering(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  const handleRefresh = async () => {
    setIsRotating(true)
    await initializePlayground()
    setTimeout(() => setIsRotating(false), 500)
  }

  return (
    <div className="flex flex-col items-start gap-2 px-3">
      <div className="text-xs font-medium uppercase text-primary">Endpoint</div>
      {isEditing ? (
        <div className="flex w-full items-center gap-1">
          <input
            type="text"
            value={endpointValue}
            onChange={(e) => setEndpointValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex h-9 w-full items-center text-ellipsis rounded-xl border border-primary/15 bg-accent p-3 text-xs font-medium text-muted"
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSave}
            className="hover:cursor-pointer hover:bg-transparent"
          >
            <LucideArrowDown className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex w-full items-center gap-1">
          <motion.div
            className="relative flex h-9 w-full cursor-pointer items-center justify-between rounded-xl border border-primary/15 bg-accent p-3 uppercase"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => setIsEditing(true)}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <AnimatePresence mode="wait">
              {isHovering ? (
                <motion.div
                  key="endpoint-display-hover"
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-primary">
                    <LucideArrowDown className="size-4" /> EDIT ENDPOINT
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="endpoint-display"
                  className="absolute inset-0 flex items-center justify-between px-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs font-medium text-muted">
                    {isMounted
                      ? truncateText(selectedEndpoint, 21) ||
                        ENDPOINT_PLACEHOLDER
                      : 'http://localhost:7777'}
                  </p>
                  <div
                    className={`size-2 shrink-0 rounded-full ${getStatusColor(isEndpointActive)}`}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            className="hover:cursor-pointer hover:bg-transparent"
          >
            <motion.div
              key={isRotating ? 'rotating' : 'idle'}
              animate={{ rotate: isRotating ? 360 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <LucideArrowDown className="size-4" />
            </motion.div>
          </Button>
        </div>
      )}
    </div>
  )
}

const AgentSection = () => {
  const { isEndpointActive, selectedModel, isEndpointLoading } = usePlaygroundStore()
  const [agentId] = useQueryState('agent')

  if (!isEndpointActive) return null

  return (
    <motion.div
      className="flex w-full flex-col items-start gap-2 px-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="text-xs font-medium uppercase text-primary">Agent</div>
      {isEndpointLoading ? (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          <AgentSelector />
          {selectedModel && agentId && <ModelDisplay model={selectedModel} />}
        </>
      )}
    </motion.div>
  )
}

const Sidebar = () => {
  const { clearChat, focusChatInput, initializePlayground } = useChatActions()
  const { messages, selectedEndpoint, isEndpointActive, hydrated } = usePlaygroundStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (hydrated) initializePlayground()
  }, [selectedEndpoint, initializePlayground, hydrated])

  const handleNewChat = () => {
    clearChat()
    focusChatInput()
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <ShadcnSidebar collapsible="icon">
        <SidebarHeader className="border-none">
          <FinleySidebarHeader />
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-5 py-3">
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
        <SidebarFooter className="border-none"></SidebarFooter>
        <SidebarTrigger className="absolute right-2 top-2" />
      </ShadcnSidebar>
    </SidebarProvider>
  )
}

export default Sidebar
