import { AppLayout } from "@/components/layout/app-layout"
import UserPostsContent from "./_comps/user-posts-content"

export default async function UserPostsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <AppLayout title="All Posts">
      <UserPostsContent userId={id} />
    </AppLayout>
  )
}
