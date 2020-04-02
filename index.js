//Global Value
const width = 600;
const height = 600;
//columns | (vertical)
const verticalNum = 10;
//rows - (horizontal)
const horizontalNum = 10;
const gridWidth = width / horizontalNum;
const gridHeight = height / verticalNum;

// For drag able add MouseConstraint and Mouse
const {Engine, Render, Runner, World, Bodies, Body} = Matter;
const engine = Engine.create();
const {world} = engine;

//create Dom for Matter
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        // get solid shape and random color
        wireframes: false,
        width,
        height
    }
});

//Running Matter
Render.run(render);
Runner.run(Runner.create(), engine);
// For drag able
/* World.add(world, MouseConstraint.create(engine,{ mouse: Mouse.create(render.canvas)}));  */


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

roadMap(startRows, startColumns);

//draw wall
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
            columnIndex * gridWidth + gridWidth / 2,
            5,
            gridHeight,

            {isStatic: true},
        );
        World.add(world, wall);
    });
});


//World.add(world, shape);

//goal
const goal = Bodies.rectangle(width - (gridWidth / 2), height - (gridHeight / 2), gridWidth * 0.7, gridHeight * 0.7,
    {isStatic: true,}
);
World.add(world, goal);

//ball
//adding object ro Matter World
const ball = Bodies.circle((gridWidth / 2), (gridHeight / 2), gridWidth * 0.3,);
World.add(world, ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity;
    if (event.keyCode === 87 || event.key === 'w' || event.key === 'ArrowUp') {
        Body.setVelocity(ball , {x,y:y-5})
    }

    if (event.keyCode === 68 || event.key === 'd' || event.key === 'ArrowRight') {
        Body.setVelocity(ball , {x:x+5,y})
    }

    if (event.keyCode === 83 || event.key === 's' || event.key === 'ArrowDown') {
        Body.setVelocity(ball , {x,y:y+5})
    }

    if (event.keyCode === 65 || event.key === 'a' || event.key === 'ArrowLeft') {
        Body.setVelocity(ball , {x:x-5,y})
    }
});