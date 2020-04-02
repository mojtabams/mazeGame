//Global Value
const width = 600;
const height = 600;
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
        wireframes:false,
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

//Walls
const walls = [
    Bodies.rectangle(width/2, 0, width, 40, {isStatic: true}),
    Bodies.rectangle(width/2, height, width, 40, {isStatic: true}),
    Bodies.rectangle(0, height/2, 40, height, {isStatic: true}),
    Bodies.rectangle(width, height/2, 40, height, {isStatic: true}),
]
World.add(world, walls);