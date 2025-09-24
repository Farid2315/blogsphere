import { AppLayout } from "@/components/layout/app-layout"
import { CreatePromotionPage } from "./_comps/create"

export default function CreatePromotionPageWrapper() {
  return (
    <AppLayout title="Create A Promotion">
      <CreatePromotionPage />
    </AppLayout>
  )
}
