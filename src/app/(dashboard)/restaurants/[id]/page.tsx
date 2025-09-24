import { AppLayout } from "../../../../components/layout/app-layout"
import { RestaurantDetail } from "../../../../components/restaurant-detail"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  return (
    <AppLayout title="Restaurant Details">
      <RestaurantDetail restaurantId={params.id} />
    </AppLayout>
  )
}
