import { AppLayout } from "@/components/layout/app-layout"
import { MusicDetail } from "../_comps/music-detail"

export default function MusicPage() {
  return (
    <AppLayout title="Music Item">
      <MusicDetail />
    </AppLayout>
  )
}
