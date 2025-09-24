import { AppLayout } from "../../../../components/layout/app-layout"
import { TravelDetail } from "../_comps/travel-detail"

type Props = {
  params: {
    id: string
  }
}

export default function TravelPage() {
  return (
    <AppLayout title="Travel Destination">
      <TravelDetail />
    </AppLayout>
  )
}
