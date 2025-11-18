const wait = async (length: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, length);
    });
};

export default wait;
