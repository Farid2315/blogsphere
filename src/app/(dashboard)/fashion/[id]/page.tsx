import { AppLayout } from "../../../../components/layout/app-layout"
import { FashionDetail } from "../../../../components/fashion-detail"

interface FashionPageProps {
  params: {
    id: string
  }
}

export default function FashionPage({ params }: FashionPageProps) {
  return (
    <AppLayout title="Fashion Details">
      <FashionDetail fashionId={params.id} />
    </AppLayout>
  )
}
