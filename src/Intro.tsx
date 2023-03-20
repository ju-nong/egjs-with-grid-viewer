import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { randomEmojis } from "./utils/randomEmojis";
import PrevBtn from "./PrevBtn";

interface MainProps {
    gaps: {
        row: string;
        column: string;
    };
}

const MainStyled = styled.main<MainProps>`
    border: 2px solid #eebbff;

    ${(props) => css`
        row-gap: ${props.gaps.row}px;
        column-gap: ${props.gaps.column}px;
    `}
`;

const AsideStyled = styled.aside``;

function Intro() {
    const [vibrate, setVibrate] = useState(false);

    const [emojis, setEmojis] = useState(randomEmojis(25));

    const [gaps, setGaps] = useState({
        row: "0",
        column: "0",
    });

    const [fontStyle, setFontStyle] = useState(true);

    function reloadEmoji() {
        if (vibrate) {
            return;
        }

        const newEmojis = randomEmojis(25);

        setEmojis((emojis) => emojis.map((_, index) => newEmojis[index]));
        setVibrate((vibrate) => !vibrate);
    }

    function resetGrid() {
        setGaps({ row: "0", column: "0" });
    }

    function handleGapChange(event: ChangeEvent<HTMLInputElement>) {
        const { target } = event;
        const { name, value } = target;

        setGaps((gaps) => ({
            ...gaps,
            [name]: value,
        }));
    }

    function handleFontStyle() {
        setFontStyle((fontStyle) => !fontStyle);
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
            <section className="flex justify-between grid-container">
                <MainStyled
                    className={`w-[60%] h-[500px] grid grid-main  ${
                        vibrate ? "vibrate" : ""
                    }`}
                    gaps={gaps}
                >
                    {emojis.map((emoji, index) => (
                        <div
                            className={`text-center text-4xl grid place-items-center emoji-box ${
                                fontStyle ? "tossface" : ""
                            }`}
                            key={index}
                        >
                            <span>{emoji}</span>
                        </div>
                    ))}
                </MainStyled>
                <AsideStyled className="w-[30%] flex flex-col gap-y-4 grid-aside p-4">
                    <label>
                        Row Gap
                        <input
                            type="number"
                            name="row"
                            min="0"
                            max="50"
                            value={gaps.row}
                            onChange={handleGapChange}
                        />
                    </label>
                    <label>
                        Column Gap
                        <input
                            type="number"
                            name="column"
                            min="0"
                            max="50"
                            value={gaps.column}
                            onChange={handleGapChange}
                        />
                    </label>
                    <label className="tossColor">
                        Tossface
                        <input
                            type="checkbox"
                            checked={fontStyle}
                            onChange={handleFontStyle}
                        />
                    </label>
                    <button className="btn-basic" onClick={reloadEmoji}>
                        Reload Emoji
                    </button>
                    <button className="btn-basic" onClick={resetGrid}>
                        Reset grid
                    </button>
                    <a
                        className="text-center text-white"
                        href="https://toss.im/tossface"
                        target="_blank"
                    >
                        What is{" "}
                        <span className="font-semibold tossColor">
                            Tossface{" "}
                            <img
                                className="w-6 inline"
                                src="tossface-loading-symbol.gif"
                            />
                        </span>
                    </a>
                </AsideStyled>
            </section>
            <span className="text-white text-center pb-2">
                <PrevBtn />
            </span>
        </div>
    );
}

export { Intro as default };
