

import RecipeList from '@/components/RecipesList/RecipeList'

const Home= ()=> {


  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
 <RecipeList/>
    </main>
  )
}
export default Home;