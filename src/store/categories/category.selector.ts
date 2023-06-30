export const selectCategoriesMap = (state: any) => state.categories.categories.reduce((acc: any, category: any) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
}, {});