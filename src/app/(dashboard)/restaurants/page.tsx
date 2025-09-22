import { Sidebar } from "../../../components/sidebar"
import { Header } from "../../../components/header"
import { RestaurantGrid } from "../../../components/restaurant-grid"

export default function RestaurantsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title="Food & Restaurant" />
        <main className="flex-1 overflow-auto">
          <RestaurantGrid />
        </main>
      </div>
    </div>
  )
}
