import React, {useCallback, useState} from "react";

export function useHookWithRefCallback<T> () {
  const ref = React.useRef<T | null>(null)
  const [internal, setInternal] = useState(null);

  const setRef = useCallback(node => {
    // Save a reference to the node
    ref.current = node
    setInternal(node);
  }, [])

  return {current: internal, ref: setRef}
}