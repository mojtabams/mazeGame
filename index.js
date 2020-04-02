//Global Value
const width = 600;
const height = 600;
//columns | (vertical)
const verticalNum = 30;
//rows - (horizontal)
const horizontalNum = 30;
const gridWidth = width / horizontalNum;
const gridHeight = height / verticalNum;

// For drag able add MouseConstraint and Mouse
const {Engine, Render, Runner, World, Bodies} = Matter;
const engine = Engine.create();
const {world} = engine;

//create Dom for Matter
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        // get solid shape and random color
       // wireframes: false,
        width,
        height
    }
});

//Running Matter
Render.run(render);
Runner.run(Runner.create(), engine);

// For drag able
/* World.add(world, MouseConstraint.create(engine,{ mouse: Mouse.create(render.canvas)}));  */

//adding object ro Matter World
const shape = Bodies.rectangle(200, 200, 50, 50, {
    isStatic: true
});
World.add(world, shape);

const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

//Walls
const walls = [
    Bodies.rectangle(width / 2, 0, width, 1, {isStatic: true}),
    Bodies.rectangle(width / 2, height, width, 1, {isStatic: true}),
    Bodies.rectangle(0, height / 2, 1, height, {isStatic: true}),
    Bodies.rectangle(width, height / 2, 1, height, {isStatic: true}),
];
World.add(world, walls);

//Maze container
//rows
const grid = Array(horizontalNum).fill(null)
    //columns
    .map(() => Array(verticalNum).fill(false));

const verticals = Array(horizontalNum).fill(null).map(() => Array(verticalNum - 1).fill(false));
const horizontals = Array(horizontalNum - 1).fill(null).map(() => Array(verticalNum).fill(false));
const startRows = Math.floor(Math.random() * horizontalNum);
const startColumns = Math.floor(Math.random() * verticalNum);

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
        if (nextRow < 0 || nextRow >= horizontalNum || nextColumn < 0 || nextColumn >= verticalNum) {
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
roadMap(startRows, startColumns);

horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * gridWidth + gridWidth / 2,
            rowIndex * gridHeight + gridHeight,
            gridWidth,
            5,
            {
                isStatic: true,
            }
        );
        World.add(world, wall);
    });
});

verticals.forEach((column, columnIndex) => {
    column.forEach((open, rowIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            rowIndex * gridHeight + gridHeight,
            columnIndex * gridWidth + gridWidth/ 2 ,
            5,
            gridHeight,

            {isStatic: true},
        );
        World.add(world, wall);
    });
});