import AllPostsContent from "./_comps/all-posts-content"

export default async function AllPostsPage({ params }: { params: Promise<{ profile: string }> }) {
  const { profile } = await params
  return <AllPostsContent userId={profile} />
}