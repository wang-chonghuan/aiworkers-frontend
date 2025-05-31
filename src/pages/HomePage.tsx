import Sidebar from '@/components/playground/Sidebar/Sidebar';
import { ChatArea } from '@/components/playground/ChatArea';

export default function HomePage() {
  return (
    <div className="flex h-screen bg-background/80">
      <Sidebar />
      <ChatArea />
    </div>
  );
}
