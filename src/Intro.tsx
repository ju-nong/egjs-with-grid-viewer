import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        if (vibrate) {
            setTimeout(() => {
                setVibrate((vibrate) => !vibrate);
            }, 1000);
        }
    }, [vibrate]);

    return (
        <div className="flex flex-col bgColor">
            {/* <h1>미안하다 이거 보여주려고 어그로끌었다</h1> */}
            <div className="text-center text-white pt-10 text-4xl font-semibold ">
                CSS Grid Viewer
            </div>
            <section className="flex justify-between p-10 grid-container">
                <MainStyled
                    className={`w-[60%] h-[500px] grid grid-main gap-x-[${
                        gaps.row
                    }px] gap-y-[${gaps.column}px] ${vibrate ? "vibrate" : ""}`}
                >
                    {emojis.map((emoji) => (
                        <div className="text-center text-4xl grid place-items-center tossface emoji-box">
                            {emoji}
                        </div>
                    ))}
                </MainStyled>
                <AsideStyled className="w-[30%]">
                    <button className="btn-basic" onClick={emojiReload}>
                        Emoji reload
                    </button>
                </AsideStyled>
            </section>
        </div>
    );
}

export { Intro as default };
