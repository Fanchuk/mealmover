interface RawReview {
  id: string;
  rating: number;
  comment: string;
  aspect: string | null;
  orderedItems?: string[] | null;
  purchasedAt?: Date | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
    memberSince?: number | null;
    createdAt?: Date | null;
  };
}

export function mapReview(r: RawReview) {
  return {
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    aspect: r.aspect,
    orderedItems: r.orderedItems ?? [],
    purchasedAt: r.purchasedAt ?? r.createdAt,
    user: {
      name: r.user.name,
      image: r.user.image,
      memberSince: r.user.memberSince ?? r.user.createdAt?.getFullYear() ?? 2022,
    },
  };
}