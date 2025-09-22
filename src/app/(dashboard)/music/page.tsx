import { AppLayout } from "../../../components/layout/app-layout"
import { MusicGrid } from "./_comps/music-grid"

export default function MusicPage() {
  return (
    <AppLayout title="Music & Entertainment">
      <div className="flex-1">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-6">
            <h1 className="text-xl font-semibold text-foreground">Music & Entertainment</h1>
          </div>
        </div>
        <MusicGrid />
      </div>
    </AppLayout>
  )
}
