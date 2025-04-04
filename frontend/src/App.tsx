import useAxios from "axios-hooks";
import { useRef, useState } from "react";
import { identifyUser } from "./util/user";
import { User } from "./interface/user";

function App() {
  const [{ data }] = useAxios<{ users: User[] }>("/");
  if (data?.users) {
    const identifyData = identifyUser(data.users);
    console.log(identifyData);
  }

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
  const timeoutRefID = useRef<Record<string, NodeJS.Timeout>>({});

  const handleMoveToOwnType = (item: { type: string; name: string }) => {
    const { type, name } = item;
    setPools((prev) => prev.filter((p) => p.name !== name));
    setCategorized((prev) => ({ ...prev, [type]: [...prev[type], name] }));

    const timeoutID = getTimeoutID(type, name);
    timeoutRefID.current[name] = timeoutID;
  };

  const getTimeoutID = (type: string, name: string) => {
    return setTimeout(() => {
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

      delete timeoutRefID.current[name];
    }, 5000);
  };

  const getTypeByName = (name: string) => {
    return Object.keys(categorized).find((type) => {
      if (categorized[type].includes(name)) {
        return type;
      }
    });
  };

  const resetCooldown = () => {
    //clear all timeouts and reset cooldown
    Object.keys(timeoutRefID.current).forEach((key) => {
      clearTimeout(timeoutRefID.current[key]);
      const type = getTypeByName(key);
      if (!type) return;

      const newTimeoutID = getTimeoutID(type, key);
      timeoutRefID.current[key] = newTimeoutID;
    });
  };

  const handleGoBack = (type: string, item: string) => {
    if (timeoutRefID.current[item]) {
      clearTimeout(timeoutRefID.current[item]);
      delete timeoutRefID.current[item];
      resetCooldown();
    }

    setPools((prev) => [...prev, { type: type, name: item }]);
    setCategorized((prev) => ({
      ...prev,
      [type]: [...prev[type].filter((p) => p !== item)],
    }));
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div
        style={{
          gridTemplateColumns: `repeat(${typeAmount.size + 1}, minmax(0, 1fr))`,
        }}
        className="w-[70vw] h-[80vh] grid gap-3"
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
