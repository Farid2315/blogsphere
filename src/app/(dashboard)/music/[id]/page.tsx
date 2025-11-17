import { AppLayout } from "@/components/layout/app-layout"
import { MusicDetail } from "@/components/music-detail"

interface MusicPageProps {
  params: {
    id: string
  }
}

export default function MusicPage({ params }: MusicPageProps) {
  return (
    <AppLayout title="Music Details">
      <MusicDetail musicId={params.id} />
    </AppLayout>
  )
}
