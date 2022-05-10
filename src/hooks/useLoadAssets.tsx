import { useEffect, useState } from "react";
import { APIResponse, Nft } from "../types";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "X-API-KEY": process.env.REACT_APP_API_KEY || "",
  },
};

const useLoadAssets = () => {
  const [items, setItems] = useState<Nft[]>([]);
  const [isMounting, setIsMounting] = useState<boolean>(true);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const loadItems = async (next?: boolean): Promise<Nft[]> => {
    let url: string | undefined = process.env.REACT_APP_API_URL;
    if (!url) {
      throw new Error("Must define an url");
    }
    if (next) {
      let cursor = localStorage.getItem("nextCursor");
      url = `${url}&cursor=${cursor}`;
    }
    try {
      if (!options.headers["X-API-KEY"]) {
        throw new Error("Must define an API KEY");
      }
      const response: APIResponse = await fetch(url, options).then((data) =>
        data.json()
      );
      localStorage.setItem("nextCursor", response.next);
      return response.assets;
    } catch (error) {
      throw new Error();
    }
  };

  const loadMore = async () => {
    setIsFetching(true);
    try {
      const items = await loadItems(true);
      setItems((prevItems) => [...prevItems, ...items]);
      setIsFetching(false);
    } catch (error) {
      console.error(error);
      setHasError(true);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const items = await loadItems();
        setItems(items);
        setIsMounting(false);
      } catch (error) {
        setItems([]);
        setHasError(true);
        setIsMounting(false);
        console.error(error);
      }
    })();
  }, []);

  return {
    isMounting,
    isFetching,
    items,
    loadMore,
    hasError,
  };
};

export default useLoadAssets;
