import { AppLayout } from "../../components/layout/app-layout"
import { RestaurantGrid } from "./restaurants/_comps/restaurant-grid"

export default function DashboardPage() {
  return (
    <AppLayout title="Dashboard">
      <div className="flex-1">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-6">
            <h1 className="text-xl font-semibold text-foreground">Food & Restaurant</h1>
          </div>
        </div>
        <RestaurantGrid />
      </div>
    </AppLayout>
  )
}
