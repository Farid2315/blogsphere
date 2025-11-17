import { AppLayout } from "@/components/layout/app-layout"
import { TravelDetail } from "@/components/travel-detail"

interface TravelPageProps {
  params: {
    id: string
  }
}

export default function TravelPage({ params }: TravelPageProps) {
  return (
    <AppLayout title="Travel Details">
      <TravelDetail travelId={params.id} />
    </AppLayout>
  )
}
