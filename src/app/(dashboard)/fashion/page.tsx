import { AppLayout } from "../../../components/layout/app-layout"
import { FashionGrid } from "./_comps/fashion-grid"

export default function FashionPage() {
  return (
    <AppLayout title="Fashion & Style">
      <div className="flex-1">
        <div className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center px-6">
            <h1 className="text-xl font-semibold text-foreground">Fashion & Style</h1>
          </div>
        </div>
        <FashionGrid />
      </div>
    </AppLayout>
  )
}
