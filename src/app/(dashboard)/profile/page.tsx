import { AppLayout } from "../../../components/layout/app-layout"
import { ProfileContent } from "./_comps/profile-content"

export default function ProfilePage() {
  return (
    <AppLayout title="Profile name">
      <ProfileContent />
    </AppLayout>
  )
}
