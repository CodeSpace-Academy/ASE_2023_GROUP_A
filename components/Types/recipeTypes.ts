// recipeTypes.ts
export type RecipeData = {
    _id: string;
    recipe: {
      title: string;
      description: string;
      prep: number;
      cook: number;
      category: string;
      servings: number;
      published: number;
      tags: string[];
      images: string[];
      ingredients: Record<string, string>;
      instructions: string[];
    };
  };
export type Recipe = {
    _id: string;
    title: string;
    description: string;
    prep: number;
    cook: number;
    category: string;
    servings: number;
    published: string;
    tags: number[];
    images: string[];
  }