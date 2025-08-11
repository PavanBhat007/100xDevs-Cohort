type KeyPressed = "up" | "right" | "down" | "left";

enum Direction {
    up="up",
    down="down",
    left="left",
    right="right"
}

function performAction(keypress: Direction) {
    if (keypress == Direction.up) { /* ... */ }
    if (keypress == Direction.down) { /* ... */ }
    if (keypress == Direction.left) { /* ... */ }
    if (keypress == Direction.right) { /* ... */ }
}

performAction(Direction.up);
performAction(Direction.right);
// performAction("Rightcvhev"); // gives an error