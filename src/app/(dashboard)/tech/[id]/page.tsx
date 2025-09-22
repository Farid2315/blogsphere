import { AppLayout } from "../../../../components/layout/app-layout"
import { TechDetail } from "../_comps/tech-detail"

interface TechPageProps {
  params: {
    id: string
  }
}

export default function TechPage({ params }: TechPageProps) {
  return (
    <AppLayout title="Tech Product">
      <TechDetail techId={params.id} />
    </AppLayout>
  )
}
