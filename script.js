function showImage() {
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
    print("Welcome to Mr. D's CS Journey Adventure Game!");
    print("It's a text-based, choose-your-own-adventure game to find help in a CS course that works for you!");
    const choice = await getInput("Hit enter to proceed: ");
    clearTerminal();
    await help();
}
async function help() {
    print("Need some help?");
    print("1. Yes!");
    print("2. Nope!");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await need();
    } else     if (choice === '2') {
        await end();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await help();
    }
}

async function need() {
    print("What do you need?");
    print("1. I have a question about a concept or assignment");
    print("2. Something about the course isn't working for me");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await in_class();
    } else     if (choice === '2') {
        await feedback();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await need();
    }
}

async function in_class() {
    print("Are you in class?");
    print("1. Yes");
    print("2. No");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await in_class_question();
    } else     if (choice === '2') {
        await school_day();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await in_class();
    }
}

async function in_class_question() {
    print("Help options:");
    print("1. Ask Mr. D");
    print("2. Ask a classmate");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await answered();
    } else     if (choice === '2') {
        await answered();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await in_class_question();
    }
}

async function school_day() {
    print("Is it during the school day?");
    print("1. Yes");
    print("2. No");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await during_school();
    } else     if (choice === '2') {
        await outside_school();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await school_day();
    }
}

async function during_school() {
    print("Help options:");
    print("1. Go to Mr. D's office hours");
    print("2. Go to TA tutorial sessions");
    print("3. Make an appointment with Mr. D");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await answered();
    } else     if (choice === '2') {
        await answered();
    } else     if (choice === '3') {
        await answered();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await during_school();
    }
}

async function outside_school() {
    print("Help options:");
    print("1. Email Mr. D");
    print("2. Email the TAs");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await answered();
    } else     if (choice === '2') {
        await answered();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await outside_school();
    }
}

async function feedback() {
    print("How would you like to provide feedback?");
    print("1. Talk with Mr. D");
    print("2. Email Mr. D");
    print("3. Submit through anonymous form on Canvas");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await improve();
    } else     if (choice === '2') {
        await improve();
    } else     if (choice === '3') {
        await improve();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await feedback();
    }
}

async function answered() {
    print("Still need help?");
    print("1. Nope!");
    print("2. Yes!");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await end();
    } else     if (choice === '2') {
        await in_class();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await answered();
    }
}

async function improve() {
    print("Did the situation improve?");
    print("1. Yes!");
    print("2. Nope...");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await end();
    } else     if (choice === '2') {
        await convos();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await improve();
    }
}

async function convos() {
    print("Have you had multiple conversations?");
    print("1. Yes");
    print("2. No");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await chair();
    } else     if (choice === '2') {
        await feedback();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await convos();
    }
}

async function chair() {
    print("Talk with the CS chair");
    print("1. Proceed");
    const choice = await getInput("Enter your choice: ");
    clearTerminal();

    if (choice === '1') {
        await improve();
    } else  {
        print("Invalid choice. Please enter a valid number.");
        await chair();
    }
}

async function end() {
    print("Congrats, you should excel in this course!");
    // No edges available from this node.
}

