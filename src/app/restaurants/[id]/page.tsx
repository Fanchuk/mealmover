export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="min-h-screen p-8">
      <h1 className="font-heading text-2xl font-bold">Restaurant {id}</h1>
    </main>
  );
}