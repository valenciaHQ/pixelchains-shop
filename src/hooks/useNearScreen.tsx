import { useEffect, useState, useRef, RefObject } from "react";

interface useNearScreenProps {
  distance?: string;
  externalRef: RefObject<HTMLElement> | null;
  once: boolean;
}

const useNearScreen = ({
  distance = "100px",
  externalRef,
  once = true,
}: useNearScreenProps) => {
  const [isNearScreen, setShow] = useState(false);
  const fromRef = useRef();

  useEffect(() => {
    let observer: IntersectionObserver;

    const element = externalRef ? externalRef.current : fromRef.current;

    const onChange = (entries: any, observer: IntersectionObserver) => {
      const el = entries[0];
      if (el.isIntersecting) {
        setShow(true);
        once && observer.disconnect();
      } else {
        !once && setShow(false);
      }
    };

    Promise.resolve(
      typeof IntersectionObserver !== "undefined"
        ? IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance,
      });

      if (element) observer.observe(element);
    });

    return () => observer && observer.disconnect();
  });

  return { isNearScreen, fromRef };
};

export default useNearScreen;
