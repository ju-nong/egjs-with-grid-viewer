import { useState, useEffect, SyntheticEvent } from "react";
import Flicking from "@egjs/react-flicking";
import axios from "axios";
import PrevBtn from "./PrevBtn";

function FlickingPage() {
    const [cats, setCats] = useState<Array<string>>([]);

    async function getCat(event: SyntheticEvent<HTMLButtonElement>) {
        const type = event.currentTarget.name;

        try {
            const { data } = await axios.get(
                "https://cataas.com/cat/cute?json=true",
                { timeout: 5000 },
            );

            const { _id } = data;

            if (!_id) {
                throw "Empty";
            }

            if (type === "prepend") {
                setCats((cats) => [_id, ...cats]);
            } else if (type === "append") {
                setCats((cats) => [...cats, _id]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getCats() {
        try {
            const { data } = await axios.get(
                "https://cataas.com/api/cats?tags=cute&limit=5&json=true",
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
        <div className=" grid place place-items-center h-[100vh] relative">
            <div className="text-2xl text-center">
                <h1>대충 플리킹</h1>
            </div>
            <div className="relative">
                <Flicking circular={true}>
                    {cats.map((cat, index) => (
                        <div
                            className="filcking-panel inline-block m-2 rounded w-[50%] h-[500px] cursor-pointer relative"
                            key={index}
                        >
                            <span className="absolute left-2 top-2 z-10 text-xl font-semibold">
                                {index}
                            </span>
                            <img
                                className="w-full h-full object-cover pointer-events-none "
                                src={`https://cataas.com/cat/${cat}`}
                            />
                        </div>
                    ))}
                </Flicking>
            </div>
            <div className="text-2xl text-center flex gap-5 py-2">
                <button
                    className="btn-simple middle"
                    name="prepend"
                    onClick={getCat}
                >
                    Prepend
                </button>
                <button
                    className="btn-simple middle"
                    name="append"
                    onClick={getCat}
                >
                    Append
                </button>
            </div>
            <PrevBtn />
        </div>
    );
}

export { FlickingPage as default };
