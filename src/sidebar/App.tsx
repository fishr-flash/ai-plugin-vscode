import React from "react";
import { useAppSelector, useAppDispatch } from "./hooks";
import { increment } from "./features/counterSlice";

export const App = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sidebar Panel</h1>
      <p className="mb-2">Count: {count}</p>
      <button
        className="border px-2 py-1"
        onClick={() => dispatch(increment())}
      >
        +1
      </button>
    </div>
  );
};
