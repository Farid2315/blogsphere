import { AppLayout } from "@/components/layout/app-layout"
import UserProfileContent from "./_comps/user-profile-content"

export default async function UserProfilePage({ params }: { params: Promise<{ profile: string }> }) {
  const { profile } = await params
  return (
    <AppLayout title="Profile">
      <UserProfileContent userId={profile} />
    </AppLayout>
  )
}