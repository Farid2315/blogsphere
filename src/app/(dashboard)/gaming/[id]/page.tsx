import { AppLayout } from "@/components/layout/app-layout"
import { GamingDetail } from "../_comps/gaming-detail"

interface GamingPageProps {
  params: {
    id: string
  }
}

export default function GamingPage({ params }: GamingPageProps) {
  return (
    <AppLayout title="Gaming Item">
      <GamingDetail itemId={params.id} />
    </AppLayout>
  )
}
