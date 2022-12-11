import React from "react";
import { Category, CategoriesDataProps } from "./commonInterfaces";

interface Context {
  category: Category | null;
  setCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  categories: CategoriesDataProps | null;
  setCategories: React.Dispatch<
    React.SetStateAction<CategoriesDataProps | null>
  >;
}
const CategoryContext = React.createContext<Context>({
  category: null,
  setCategory: (): void => {},
  categories: null,
  setCategories: (): void => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

const CategoryProvider: React.FC<ProviderProps> = (
  children
): React.ReactElement => {
  const [category, setCategory] = React.useState<Category | null>(null);
  const [categories, setCategories] =
    React.useState<CategoriesDataProps | null>(null);
  const value = React.useMemo((): Context => {
    return {
      category,
      setCategory,
      categories,
      setCategories,
    };
  }, [category, setCategory, categories, setCategories]);

  return <CategoryContext.Provider value={value} {...children} />;
};
function useCategory() {
  const context = React.useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be inside HistoryProvider !");
  }
  return { ...context };
}
export { CategoryProvider, useCategory };
