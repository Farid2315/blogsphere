import { AppLayout } from "@/components/layout/app-layout"
import { MusicDetail } from "../_comps/music-detail"

interface MusicPageProps {
  params: {
    id: string
  }
}

export default function MusicPage({ params }: MusicPageProps) {
  return (
    <AppLayout title="Music Item">
      <MusicDetail itemId={params.id} />
    </AppLayout>
  )
}
