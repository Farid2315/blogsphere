import { AppLayout } from "../../../../components/layout/app-layout"
import { TechDetail } from "../../../../components/tech-detail"

interface TechPageProps {
  params: {
    id: string
  }
}

export default function TechPage({ params }: TechPageProps) {
  return (
    <AppLayout title="Tech Details">
      <TechDetail techId={params.id} />
    </AppLayout>
  )
}
