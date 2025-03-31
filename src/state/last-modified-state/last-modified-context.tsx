import { createContext } from "react";
import { Product } from "../../entities/product-entity";

interface LastModifiedState {
  lastModifiedProduct?: Product;
  setLastModifiedProduct: (product: Product) => void;
}

export const LastModifiedContext = createContext<LastModifiedState>({
  lastModifiedProduct: undefined,
  setLastModifiedProduct: () => {},
});
