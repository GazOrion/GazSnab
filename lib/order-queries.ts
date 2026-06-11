export const orderWithItemsInclude = {
  items: {
    include: {
      product: {
        select: {
          slug: true,
          imageUrl: true
        }
      }
    }
  }
} as const;
