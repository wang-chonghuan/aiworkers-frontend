import Page from "@/app/dashboard/page"
import { QueryProvider } from "@/providers/query-provider"

function App() {
  return (
    <QueryProvider>
      <Page />
    </QueryProvider>
  )
}

export default App
