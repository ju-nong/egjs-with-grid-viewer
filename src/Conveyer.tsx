import { useState, useRef, useEffect } from "react";
import { useConveyer } from "@egjs/react-conveyer";
import axios from "axios";
import styled from "@emotion/styled";

function Conveyer() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollIntoView } = useConveyer(ref);

    const [cats, setCats] = useState<Array<string>>([]);

    async function getCats() {
        try {
            const { data } = await axios.get(
                "https://cataas.com/api/cats?tags=cute&json=true",
                { timeout: 5000 }
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
        <div className="conveyer-container">
            {/* <div className="buttons">
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
                    Prev
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
                    Next
                </button>
            </div> */}
            <div
                className="items overflow-y-hidden overflow-x-scroll w-full overscroll-none relative whitespace-nowrap"
                ref={ref}
            >
                {cats.map((cat) => (
                    <div className="item inline-block m-2 rounded w-[25%] h-[500px] cursor-pointer">
                        <img
                            className="w-full h-full object-cover pointer-events-none "
                            src={`https://cataas.com/cat/${cat}`}
                        />
                    </div>
                ))}
                {/* <div className="item">1</div>
                <div className="item">2</div>
                <div className="item">3</div> */}
            </div>
        </div>
    );
}

export { Conveyer as default };
