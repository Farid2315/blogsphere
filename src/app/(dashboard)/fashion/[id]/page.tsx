import { AppLayout } from "../../../../components/layout/app-layout"
import { FashionDetail } from "../_comps/fashion-detail"

interface FashionPageProps {
  params: {
    id: string
  }
}

export default function FashionPage({ params }: FashionPageProps) {
  return (
    <AppLayout title="Fashion Item">
      <FashionDetail itemId={params.id} />
    </AppLayout>
  )
}
