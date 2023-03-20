import { useState, useRef, useEffect } from "react";
import { useConveyer } from "@egjs/react-conveyer";
import axios from "axios";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import PrevBtn from "./PrevBtn";

function Conveyer() {
    const $ref = useRef<HTMLDivElement>(null);

    const $conveyer = useConveyer($ref);

    const { scrollIntoView } = $conveyer;

    const [cats, setCats] = useState<Array<string>>([]);

    async function getCats() {
        try {
            const { data } = await axios.get(
                "https://cataas.com/api/cats?tags=cute&limit=20&json=true",
                { timeout: 5000 },
            );

            if (!data.length) {
                throw "Empty";
            }

            const ids = data.map((cat: any) => cat._id);
            setCats((cats) => [...cats, ...ids]);
        } catch (error) {}
    }

    useEffect(() => {
        if (cats.length) {
            return;
        }

        getCats();
    }, []);

    return (
        <div className="grid place place-items-center h-[100vh] relative">
            <div className="text-2xl text-center">
                <h1>대충 컨베이어</h1>
                <button
                    className="prev"
                    onClick={() => {
                        // start to end
                        scrollIntoView("start", {
                            align: "end",
                            duration: 500,
                        });
                    }}
                >
                    <GrFormPrevious />
                </button>
                <button
                    className="next"
                    onClick={() => {
                        // end to start
                        scrollIntoView("end", {
                            align: "start",
                            duration: 500,
                        });
                    }}
                >
                    <GrFormNext />
                </button>
            </div>
            <div className="conveyer-container relative">
                <div
                    className="items overflow-y-hidden overflow-x-scroll w-full overscroll-none relative whitespace-nowrap"
                    ref={$ref}
                >
                    {cats.map((cat, index) => (
                        <div
                            className="item inline-block m-2 rounded w-[25%] h-[500px] cursor-pointer"
                            key={index}
                        >
                            <img
                                className="w-full h-full object-cover pointer-events-none "
                                src={`https://cataas.com/cat/${cat}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <PrevBtn />
        </div>
    );
}

export { Conveyer as default };
