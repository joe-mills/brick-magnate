export const PRODUCTS: any = {
  1: {
    id: 1,
    name: 'Police Station',
    productCode: '10000',
    price: 19.99,
    ages: '8+',
    piecesCount: 1000,
    vipPoints: 100,
    year: '2020',
    themeId: 1,
    themeName: 'City',
    themeImageUrl: '',
    productImages: [],
    productLinks: [],
    productCategories: [],
    partial: false,
    mainImageUrl: '',
  },
};
export const COLLECTIONS: any = {
  1: {
    id: 1,
    name: 'Test Collection 1',
    collectionItems: [
      {
        id: 1,
        productId: 1,
        collectionName: 'Test Collection 1',
        collectionId: 1,
        quantity: 1,
      },
      {
        id: 2,
        productId: 1,
        collectionName: 'Test Collection 1',
        collectionId: 1,
        quantity: 2,
      },
    ],
  },
};

export const COLLECTIONITEMS: any = {
  1: {
    id: 1,
    productId: 1,
    collectionName: 'Test Collection 1',
    collectionId: 1,
    quantity: 1,
  },
  2: {
    id: 2,
    productId: 1,
    collectionName: 'Test Collection 1',
    collectionId: 1,
    quantity: 2,
  },
  3: {
    id: 3,
    productId: 1,
    collectionName: 'Test Collection 2',
    collectionId: 2,
    quantity: 1,
  },
};
