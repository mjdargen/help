import re
import os

DIR_PATH = os.path.dirname(os.path.realpath(__file__))


class Edge:
    def __init__(self, from_node, to_node, label=None):
        self.from_node = from_node
        self.to_node = to_node
        self.label = label

    def __eq__(self, other):
        return isinstance(other, Edge) and self.label == other.label

    def __repr__(self):
        return (f"Edge(from_node='{self.from_node}', to_node='{self.to_node}', label='{self.label}')")


class Node:
    def __init__(self, name, label=None):
        self.name = name
        self.label = label
        self.edges = []

    def add_edge(self, edge):
        self.edges.append(edge)

    def __eq__(self, other):
        return isinstance(other, Node) and self.name == other.name and self.label == other.label

    def __repr__(self):
        return (f"Node(name='{self.name}', label='{self.label}', edges={self.edges})")


def generate_js(nodes):
    js_code = """function showImage() {
    var img = document.getElementById("hiddenDiv");
    var btn = document.getElementById("hideButton");
    // Toggle display of the image
    var computedStyle = window.getComputedStyle(img).display;
    if (computedStyle == "none") {
        img.style.display = "block"; // Show image
        btn.textContent = "Click here to hide the flow chart";
    } else {
        img.style.display = "none";  // Hide image
        btn.textContent = "Click here to show the flow chart";
    }
}

const terminal = document.getElementById('terminal');

function print(message) {
    const output = document.createElement('div');
    output.textContent = message;
    terminal.appendChild(output);
}

function clearTerminal() {
    terminal.innerHTML = '';
}

function getInput(prompt) {
    return new Promise(resolve => {
        const inputElement = document.createElement('input');
        inputElement.placeholder = prompt;
        terminal.appendChild(inputElement);
        inputElement.focus();

        inputElement.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const inputValue = inputElement.value;
                terminal.removeChild(inputElement);
                resolve(inputValue);
            }
        });
    });
}

async function main() {
    await start();
}

main();

async function start() {
    print("Welcome to Mr. D\'s CS Journey Adventure Game!");
    print("It's a text-based, choose-your-own-adventure game to find help in a CS course that works for you!");
    const choice = await getInput("Hit enter to proceed: ");
    clearTerminal();
    await help();
}
"""

    for node_name, node in nodes.items():
        if node_name == "start":
            continue
        js_code += f"async function {node_name}() {{\n"
        js_code += f"    print(\"{node.label}\");\n"

        # Add choices and transitions for each edge
        if node.edges:
            for i, edge in enumerate(node.edges, start=1):
                js_code += f"    print(\"{i}. {edge.label}\");\n"

            js_code += f"    const choice = await getInput(\"Enter your choice: \");\n"
            js_code += f"    clearTerminal();\n\n"

            # Add if-else conditions to handle choices
            for i, edge in enumerate(node.edges, start=1):
                js_code += f"    if (choice === '{i}') {{\n"
                js_code += f"        await {edge.to_node.name}();\n"
                js_code += f"    }} else "

            js_code += " {\n"
            js_code += f"        print(\"Invalid choice. Please enter a valid number.\");\n"
            js_code += f"        await {node_name}();\n"
            js_code += f"    }}\n"
        else:
            js_code += "    // No edges available from this node.\n"

        js_code += "}\n\n"

    return js_code


# Now rerun the whole logic with the corrected imports

def extract_nodes_and_edges(gv_content):
    # Regex patterns to match node definitions and edges
    # node_pattern = re.compile(r'(\w+)\[([^]]+)\]', re.MULTILINE)
    node_pattern = re.compile(
        r'(\w+)\s*\[.*label="([^"]+)",.*shape', re.MULTILINE)
    edge_pattern = re.compile(
        r'(\w+)\s*->\s*(\w+)(?:\s*\[label="([^"]+)")?', re.MULTILINE)

    nodes = {}

    # Extract nodes and their attributes
    for match in node_pattern.findall(gv_content):
        # Create a Node object with the parsed attributes
        node = Node(
            name=match[0],
            label=match[1]
        )
        nodes[node.name] = node

    # Extract edges and add them to the respective nodes
    for match in edge_pattern.findall(gv_content):
        from_node = nodes[match[0]]
        to_node = nodes[match[1]]
        edge_label = match[2] if match[2] else "Proceed"

        # Create an Edge object
        edge = Edge(from_node=from_node, to_node=to_node, label=edge_label)

        if from_node.name in nodes:
            nodes[from_node.name].add_edge(edge)

    return nodes


def parse_attributes(attributes_str):
    # Regex pattern to extract key-value pairs (e.g., label="start")
    attr_pattern = re.compile(r'(\w+)="([^"]+)"')
    attributes = dict(attr_pattern.findall(attributes_str))
    return attributes


# Load the .gv file content
with open(f'{DIR_PATH}/help.gv', 'r') as file:
    gv_content = file.read()

# Parse nodes and edges from the .gv file
nodes = extract_nodes_and_edges(gv_content)

# Generate JavaScript code for the parsed nodes
js_code = generate_js(nodes)

# Write the generated JavaScript code to a file
with open(f'{DIR_PATH}/script.js', 'w') as js_file:
    js_file.write(js_code)

# Print the JS code to the console (optional)
