
const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

const roadMap = (row, column) => {
    //visiting cell [row, column]
    if (grid[row][column]) {
        return
    }
    //mark visited cell (true)
    grid[row][column] = true;
    //select random nearby cell
    const neighbors = shuffle([
        [row - 1, column, 'up'],
        [row + 1, column, 'down'],
        [row, column - 1, 'left'],
        [row, column + 1, 'right'],
    ]);

    // validation selected cell and moving
    for (let neighbor of neighbors) {
        const [nextRow, nextColumn, side] = neighbor;
        //validation to be in grid
        if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal) {
            continue;

        }
        //validation for moving
        if (grid[nextRow][nextColumn] === true) {
            continue;
        }
        //remove horizontal or vertical
        if (side === 'up') {
            horizontals[row - 1][column] = true;
        } else if (side === 'down') {
            horizontals[row][column] = true;
        } else if (side === 'left') {
            verticals[row][column - 1] = true;
        } else if (side === 'right') {
            verticals[row][column] = true;
        }
        //visiting cell [row, column]
        grid[row][column] = true;
        roadMap(nextRow, nextColumn);
    }
};