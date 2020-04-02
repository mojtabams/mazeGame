//Global Value
const width = window.innerWidth;
const height = window.innerHeight;
//column  number - (horizontal)
const cellsHorizontal = 3;
//row number | (vertical)
const cellsVertical = 4;
const gridWidth = width / cellsHorizontal;
const gridHeight = height / cellsVertical;

// For drag able add MouseConstraint and Mouse
const {Engine, Render, Runner, World, Bodies, Body, Events} = Matter;
const engine = Engine.create();
//turn gravity off
engine.world.gravity.y = 0;
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
const grid = Array(cellsVertical).fill(null)
    //columns
    .map(() => Array(cellsHorizontal).fill(false));
const verticals = Array(cellsVertical).fill(null)
    .map(() => Array(cellsHorizontal - 1).fill(false));
const horizontals = Array(cellsVertical - 1).fill(null)
    .map(() => Array(cellsHorizontal).fill(false));

const startRows = Math.floor(Math.random() * cellsVertical);
const startColumns = Math.floor(Math.random() * cellsHorizontal);

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
                label: 'horizontalWall',
                isStatic: true,
                render: {
                    fillStyle: 'brown',
                }
            }
        );
        World.add(world, wall);
    });
});
/*
horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
* */

verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if (open) {
            return;
        }

        const wall = Bodies.rectangle(
            columnIndex * gridWidth + gridWidth,
            rowIndex * gridHeight + gridHeight / 2,
            5,
            gridHeight,
            {
                label: 'verticalsWall',
                isStatic: true,
                render: {
                    fillStyle: 'brown',
                }
            },
        );
        World.add(world, wall);
    });
});


//World.add(world, shape);

//goal
const goal = Bodies.rectangle(width - (gridWidth / 2), height - (gridHeight / 2), gridWidth * 0.7, gridHeight * 0.7,
    {
        isStatic: true, label: 'goal', render: {
            fillStyle: 'green',
        }
    }
);
World.add(world, goal);

//ball
//adding object ro Matter World
const ballRadius = Math.min(gridWidth, gridHeight) / 3;
const ball = Bodies.circle((gridWidth / 2), (gridHeight / 2), ballRadius, {

    label: 'ball',
    render: {
        fillStyle: 'white',
    }
});
World.add(world, ball);

document.addEventListener('keydown', event => {
    const {x, y} = ball.velocity;
    if (event.keyCode === 87 || event.key === 'w' || event.key === 'ArrowUp') {
        Body.setVelocity(ball, {x, y: y - 5})
    }
    if (event.keyCode === 68 || event.key === 'd' || event.key === 'ArrowRight') {
        Body.setVelocity(ball, {x: x + 5, y})
    }
    if (event.keyCode === 83 || event.key === 's' || event.key === 'ArrowDown') {
        Body.setVelocity(ball, {x, y: y + 5})
    }
    if (event.keyCode === 65 || event.key === 'a' || event.key === 'ArrowLeft') {
        Body.setVelocity(ball, {x: x - 5, y})
    }
});

//Win
Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(collision => {
        const labels = ['ball', 'goal'];
        if (labels.includes(collision.bodyA.label)
            &&
            labels.includes(collision.bodyB.label)) {
            document.querySelector('.winner').classList.remove('hidden');
            world.gravity.y = 1;
            alert('you Won');
            world.bodies.forEach(body => {
                if (body.label === 'verticalsWall'
                    ||
                    body.label === 'horizontalWall') {
                    Body.setStatic(body, false);
                }
            })
        }
    });
});