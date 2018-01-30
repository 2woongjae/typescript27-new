interface NumStrTuple extends Array<number | string> {
    0: number;
    1: string;
    length: 2; // 2 는 리터럴 타입
}

const a1: NumStrTuple = [0, 'one'];
const a2: NumStrTuple = [0, 'one', 2];

interface MinimumNumStrTuple extends Array<number | string> {
    0: number;
    1: string;
}

const b1: MinimumNumStrTuple = [0, 'one'];
const b2: MinimumNumStrTuple = [0, 'one', 2];