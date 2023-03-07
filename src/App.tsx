import { useEffect, useState } from 'react';

type Cart = ReadonlyArray<CartItem>;

type CartItem = {
  id: number;
  product: string;
  created_at: string;
};

// Récupérer le `state` du `SearchInput` et filtrer les `items`
// grâce à la valeur de la recherche
export default function App() {
  const [search, setSearch] = useState<string>('');
  const [items, setItems] = useState<Cart>([]);

  useEffect(() => {
    fetch('/cart.json')
      .then((res) => res.json())
      .then((data: Cart) => setItems(data));
  }, []);

  return (
    <div>
      <SearchInput setSearch={setSearch} />
      <ul>
        {items
          .filter((product) => {
            if (
              product.product
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) ||
              product.id === parseInt(search) ||
              product.created_at.includes(search)
            ) {
              return true;
            }
          })
          .map((item) => (
            <Item
              id={item.id}
              product={item.product}
              created_at={item.created_at}
            />
          ))}
      </ul>
    </div>
  );
}

// utiliser un `useState` pour récupérer le texte
// renseigné et faire une recherche
function SearchInput({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  return <input type="text" onChange={(e) => setSearch(e.target.value)} />;
}

function Item({ id, product, created_at }: CartItem) {
  return (
    <li>
      {id} : {product} ajouté le {new Date(created_at).toLocaleString()}
    </li>
  );
}
