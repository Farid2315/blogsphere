import { AppLayout } from "../../../components/layout/app-layout"
import { GamingGrid } from "./_comps/gaming-grid"

export default function GamingPage() {
  return (
    <AppLayout title="Gaming & Entertainment">
      <div className="flex-1">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-6">
            <h1 className="text-xl font-semibold text-foreground">Gaming & Entertainment</h1>
          </div>
        </div>
        <GamingGrid />
      </div>
    </AppLayout>
  )
}
