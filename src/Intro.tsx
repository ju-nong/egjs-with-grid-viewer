import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "@emotion/styled";
import { randomEmojis } from "./utils/randomEmojis";

const MainStyled = styled.main`
    border: 2px solid #eebbff;
`;

const AsideStyled = styled.aside`
    border: 1px solid #fff;
`;

function Intro() {
    const [vibrate, setVibrate] = useState(false);

    const [emojis, setEmojis] = useState(randomEmojis(25));

    const [gaps, setGaps] = useState({
        row: 0,
        column: 0,
    });

    function emojiReload() {
        if (vibrate) {
            return;
        }

        const newEmojis = randomEmojis(25);

        setEmojis((emojis) => emojis.map((_, index) => newEmojis[index]));
        setVibrate((vibrate) => !vibrate);
    }

    function handleGapChange(event: ChangeEvent<HTMLInputElement>) {
        const { target } = event;
        const { name, value } = target;

        setGaps((gaps) => ({
            ...gaps,
            [name]: parseInt(value),
        }));

        console.log(name, value);
    }

    useEffect(() => {
        if (vibrate) {
            setTimeout(() => {
                setVibrate((vibrate) => !vibrate);
            }, 1000);
        }
    }, [vibrate]);

    return (
        <div className="min-h-[100vh] flex flex-col bgColor">
            {/* <h1>미안하다 이거 보여주려고 어그로끌었다</h1> */}
            <div className="text-center text-white pt-10 text-4xl font-semibold ">
                CSS Grid Viewer
            </div>
            <section className="flex justify-between p-10 grid-container">
                <MainStyled
                    className={`w-[60%] h-[500px] grid grid-main gap-x-${
                        gaps.row
                    } gap-y-${gaps.column} ${vibrate ? "vibrate" : ""}`}
                >
                    {emojis.map((emoji, index) => (
                        <div
                            className="text-center text-4xl grid place-items-center tossface emoji-box"
                            key={index}
                        >
                            <span>{emoji}</span>
                        </div>
                    ))}
                </MainStyled>
                <AsideStyled className="w-[30%] flex flex-col gap-y-4 grid-aside">
                    <button className="btn-basic" onClick={emojiReload}>
                        Emoji reload
                    </button>
                    <label>
                        Row Gap
                        <input
                            type="number"
                            min={0}
                            name="row"
                            onChange={handleGapChange}
                        />
                    </label>
                    <label>
                        Column Gap
                        <input
                            type="number"
                            min={0}
                            name="column"
                            onChange={handleGapChange}
                        />
                    </label>
                </AsideStyled>
            </section>
        </div>
    );
}

export { Intro as default };
