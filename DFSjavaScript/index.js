// ---- Seting up the Friends Conection Graph --- //

const users = ["Shon", "Daniel", "Alon", "Mika", "Amnon"];

const friendsConections = [
  ["Shon", "Mika"],
  ["Shon", "Daniel"],
  ["Daniel", "Alon"],
  ["Amnon", "Mika"],
  ["Amnon", "Daniel"],
  ["Amnon", "Shon"],
  ["Amnon", "Alon"],
];

const conectionsMap = new Map();

// add node with a name as a key value , and set the value to be an array

function addNode(name) {
  conectionsMap.set(name, []);
}

// add an edge between two nodes
function addEdge(name, firend) {
  conectionsMap.get(name).push(firend);
  // not directed graph so do the same for the other destination
  conectionsMap.get(firend).push(name);
}

// loop through names and thier friends and asign each one of them a key and an empty erray of connections
users.forEach(addNode);

// loop through all the conections and asigh an edge between their connections
friendsConections.forEach((friends) => addEdge(...friends));

console.log(conectionsMap);

// --------DFS Functions ------- //

function _DFS(startingNode, visited = new Set()) {
  console.log(startingNode);

  visited.add(startingNode);

  conections = conectionsMap.get(startingNode);

  for (conection of conections) {
    // if one of the conections in the array matches our search , print success
    if (conection === "Amnon") {
      console.log(
        "Founded a Conection With: " + conection + "through " + startingNode
      );
      return;
    }
    // if the name we are looking at is not on the viseted list ? continue the serach deeper in his connections level recursivly
    if (!visited.has(conection)) {
      _DFS(conection, visited);
    }
  }
  console.log("Finshed");
}

_DFS("Shon");
