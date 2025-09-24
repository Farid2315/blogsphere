import { AppLayout } from "../../../../components/layout/app-layout"
import { RestaurantGrid } from "../../../../components/restaurant-grid"

export default function RestaurantsPage() {
  return (
    <AppLayout title="Food & Restaurant">
      <RestaurantGrid />
    </AppLayout>
  )
}
