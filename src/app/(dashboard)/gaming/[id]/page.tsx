import { AppLayout } from "../../../../components/layout/app-layout"
import { GamingDetail } from "../../../../components/gaming-detail"

interface GamingPageProps {
  params: {
    id: string
  }
}

export default function GamingPage({ params }: GamingPageProps) {
  return (
    <AppLayout title="Gaming Details">
      <GamingDetail gamingId={params.id} />
    </AppLayout>
  )
}
