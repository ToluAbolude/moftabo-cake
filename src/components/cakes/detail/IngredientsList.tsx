
interface IngredientsListProps {
  ingredients: string[];
}

const IngredientsList = ({ ingredients }: IngredientsListProps) => (
  <div className="border-t border-gray-200 pt-8 mb-16">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {ingredients.map((ingredient, index) => (
        <li key={index} className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-cake-purple mr-2"></div>
          <span>{ingredient}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default IngredientsList;
