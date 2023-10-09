import React from 'react';
import { Meta, Story } from '@storybook/react';
import RecipeList from '../components/RecipesList/RecipeList';

export default {
  title: 'RecipeList', // The title of your component category in Storybook
  component: RecipeList, // The component to which this story belongs
} as Meta;

const Template: Story = (args) => <RecipeList {...args} />;

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
    images: ['image1.jpg', 'image2.jpg'],}
};
