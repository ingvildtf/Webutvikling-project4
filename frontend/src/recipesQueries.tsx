import gql from 'graphql-tag';
// or import gql from 'graphql-tag.macro';

const fragments = {
  recipe: gql`
    fragment recipesFragment on Recipes {
        Name
        Category
        Instruction
        Ingredients
        Image
        Review
    }
  `
};


export const query = gql`
  query Recipes {
    recipes{
        ID
        ...recipesFragment
    }
  }

  ${fragments.recipe}
`;
