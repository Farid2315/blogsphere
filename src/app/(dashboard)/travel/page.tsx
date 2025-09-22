import { AppLayout } from "../../../components/layout/app-layout"
import { TravelGrid } from "./_comps/travel-grid"

export default function TravelPage() {
  return (
    <AppLayout title="Travel & Tourism">
      <div className="flex-1">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-6">
            <h1 className="text-xl font-semibold text-foreground">Travel & Tourism</h1>
          </div>
        </div>
        <TravelGrid />
      </div>
    </AppLayout>
  )
}
