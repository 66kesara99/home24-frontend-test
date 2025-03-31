import { useCallback, useEffect, useState } from "react";
import { getLastModifiedProduct } from "../../api/products";
import { Product } from "../../entities/product-entity";
import { LastModifiedContext } from "./last-modified-context";

export const LastModifiedProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lastModifiedProduct, setLastModifiedProduct] = useState<Product>();

  const init = useCallback(async () => {
    const result = await getLastModifiedProduct();
    setLastModifiedProduct(result);
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <LastModifiedContext.Provider
      value={{
        lastModifiedProduct,
        setLastModifiedProduct,
      }}
    >
      {children}
    </LastModifiedContext.Provider>
  );
};
