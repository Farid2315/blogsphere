import { AppLayout } from "@/components/layout/app-layout"
import { TravelDetail } from "../_comps/travel-detail"

export default function TravelPage() {
  return (
    <AppLayout title="Travel Destination">
      <TravelDetail />
    </AppLayout>
  )
}
