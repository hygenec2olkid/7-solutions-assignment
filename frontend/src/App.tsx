import { useState } from "react";

function App() {
  const initialPools = [
    {
      type: "Fruit",
      name: "Apple",
    },
    {
      type: "Vegetable",
      name: "Broccoli",
    },
    {
      type: "Vegetable",
      name: "Mushroom",
    },
    {
      type: "Fruit",
      name: "Banana",
    },
    {
      type: "Vegetable",
      name: "Tomato",
    },
    {
      type: "Fruit",
      name: "Orange",
    },
    {
      type: "Fruit",
      name: "Mango",
    },
    {
      type: "Fruit",
      name: "Pineapple",
    },
    {
      type: "Vegetable",
      name: "Cucumber",
    },
    {
      type: "Fruit",
      name: "Watermelon",
    },
    {
      type: "Vegetable",
      name: "Carrot",
    },
  ];
  const typeAmount = new Set(initialPools.map((_) => _.type));

  const [pools, setPools] = useState(initialPools);
  const [categorized, setCategorized] = useState(
    [...typeAmount].reduce((acc, cur) => {
      return { ...acc, [cur]: [] };
    }, {} as Record<string, string[]>)
  );

  const handleMoveToOwnType = (item: { type: string; name: string }) => {
    const { type, name } = item;
    setPools((prev) => prev.filter((p) => p.name !== name));
    setCategorized((prev) => ({ ...prev, [type]: [...prev[type], name] }));

    setTimeout(() => {
      //prevent add duplicate item back in pools
      setPools((prev) => {
        //make sure pools not have item
        if (prev.every((p) => p.name !== name)) {
          return [...prev, { type, name }];
        }
        //pools already have item from manual click item back
        else {
          return [...prev];
        }
      });

      setCategorized((prev) => ({
        ...prev,
        [type]: [...prev[type].filter((p) => p !== name)],
      }));
    }, 5000);
  };

  const handleGoBack = (type: string, item: string) => {
    setPools((prev) => [...prev, { type: type, name: item }]);
    setCategorized((prev) => ({
      ...prev,
      [type]: [...prev[type].filter((p) => p !== item)],
    }));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div
        className={`w-[70vw] h-[80vh] grid grid-cols-${
          typeAmount.size + 1
        } gap-3`}
      >
        <div className="flex flex-col gap-3 p-2 max-h-full overflow-y-auto">
          {pools.map((item, index) => (
            <div
              key={index}
              className="p-3 border border-solid border-black cursor-pointer hover:bg-[#16C47F] hover:text-white"
              onClick={() => handleMoveToOwnType(item)}
            >
              {item.name}
            </div>
          ))}
        </div>
        {[...typeAmount].map((type, index) => (
          <div key={index} className="border border-solid border-black">
            <div className="border-b border-solid border-black text-center py-3 bg-[#ECDFCC]">
              {type}
            </div>
            <div className="flex flex-col p-2 gap-4">
              {categorized[type].map((item, index) => (
                <div
                  key={index}
                  className="p-3 border border-solid border-black cursor-pointer hover:bg-[#F93827] hover:text-white"
                  onClick={() => handleGoBack(type, item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
