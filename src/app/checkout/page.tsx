import { CheckoutContent } from "@/src/features/checkout/components/CheckoutContent";
import { prisma } from "@/src/lib/prisma";
import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";

export default async function CheckoutPage() {
    const session = await auth();
    if (!session?.user?.id) {
        redirect('/sign-in?callbackUrl=/checkout');
    }

    const addresses = session?.user.id
       ? await prisma.address.findMany({
        where: { userId: session.user.id },
        orderBy: { isDefault: 'desc' }
       })
       : [];

    const restaurant = await prisma.restaurant.findFirst({
        orderBy: { isFeatured: 'desc' },
        select: { id: true, name: true, lat: true, lng: true, distanceKm: true}
    });

  return (
    <CheckoutContent
      addresses={addresses.map((a) => ({
        id: a.id,
        title: a.title,
        street: a.street,
        note: a.note,
        lat: a.lat,
        lng: a.lng
      }))}
      restaurant={restaurant}
    />
  );
}