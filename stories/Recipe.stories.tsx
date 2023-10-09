import React from 'react';
import { Meta, Story } from '@storybook/react';
import Recipe from '../components/Recipes/Recipe'; // Adjust the import path as needed

export default {
  title: 'Recipe', // The title of your component category in Storybook
  component: Recipe, // The component that this story represents
} as Meta;

const Template: Story = (args) => <Recipe {...args} />;

export const Default = Template.bind({});
Default.args = {
  recipe: {
    title: 'Sample Recipe',
    description: 'A delicious sample recipe',
    prep: 30,
    cook: 45,
    category: 'Sample Category',
    servings: 4,
    published: new Date().toISOString(),
    tags: ['Tag1', 'Tag2'],
    images: ['image1.jpg', 'image2.jpg'],
    ingredients: {
      Ingredient1: '2 cups',
      Ingredient2: '1 tsp',
    },
    instructions: ['Step 1: Do something', 'Step 2: Do something else'],
  },
};
