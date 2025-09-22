import { AppLayout } from "../../../../components/layout/app-layout"
import { TravelDetail } from "../_comps/travel-detail"

interface TravelPageProps {
  params: {
    id: string
  }
}

export default function TravelPage({ params }: TravelPageProps) {
  return (
    <AppLayout title="Travel Destination">
      <TravelDetail itemId={params.id} />
    </AppLayout>
  )
}
