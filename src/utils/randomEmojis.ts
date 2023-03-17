function randomEmojis(length: number) {
    let emojis = [];
    const emojiRangeStart = 0x1f600;
    const emojiRangeEnd = 0x1f64f;

    for (let i = 0; i < length; i++) {
        const randomEmoji = String.fromCodePoint(
            Math.floor(
                Math.random() * (emojiRangeEnd - emojiRangeStart) +
                    emojiRangeStart,
            ),
        );
        emojis.push(randomEmoji);
    }

    return emojis;
}

export { randomEmojis };
