let container = document.getElementById("array");
let sortButton = document.getElementById("sortBtn");
let addButton = document.getElementById("addBtn");
let resetButton = document.getElementById("resetBtn");
let numberInput = document.getElementById("num");
let capacity = document.getElementById("capacity");
let confettianimation = document.getElementById("confetti");
let status = document.getElementById("status");
let count = 0;
// Function to randomly shuffle the array
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {

        // Generate random number
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
function generatearray() {

    // Creating an array
    let arr = [];

    addButton.addEventListener("click", async function() {
        /*arr.push(numberInput.value);
        let value = numberInput.value;

        // Creating element div
        let array_ele = document.createElement("div");

        // Adding class 'block' to div
        array_ele.classList.add("block");

        // Adding style to div
        array_ele.style.height = `0px`;
        array_ele.style.transform = `translate(${count * 30}px)`;

        // Creating label element for displaying
        // size of particular block
        let array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        // Appending created elements to index.html
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 1)
        );
        array_ele.style.height = `${value * 13}px`;

        count++;
        capacity.innerHTML = `Capacity: ${arr.length}/20`;
        numberInput.focus();*/

        if (arr.length >= 20) {
            status.innerText = "> Capacity full!";
            numberInput.value = "";
            return;
        }

        if (numberInput.value.length > 0) {
            status.innerText = "> Inserting number(s)...";
        addButton.disabled = true;

        let values = numberInput.value.split(",");
        for (let i = 0; i < values.length; i++) {
            if (arr.length >= 20) {
                status.innerText = "> Capacity full!";
                numberInput.value = "";
                return;
            }
            if (values[i] < 1 || values[i] > 20) {
                status.innerText = "> Please enter numbers between 1 and 20 only!";
                addButton.disabled = false;
                return;
            } else {
                arr.push(values[i]);
                let value = values[i];
                
                // Creating element div
                let array_ele = document.createElement("div");

                // Adding class 'block' to div
                array_ele.classList.add("block");

                // Adding style to div
                array_ele.style.height = `0px`;
                array_ele.style.transform = `translate(${count * 30}px)`;

                // Creating label element for displaying
                // size of particular block
                let array_ele_label = document.createElement("label");
                array_ele_label.classList.add("block_id");

                // Appending created elements to index.html
                array_ele.appendChild(array_ele_label);
                container.appendChild(array_ele);

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, 200)
                );
                array_ele.style.height = `${value * 13}px`;
                array_ele_label.innerText = value;

                count++;
                capacity.innerHTML = `Capacity: ${arr.length}/20`;
                }
            }
                numberInput.value = "";
                addButton.disabled = false;
                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, 500)
                );

                if (arr.length >= 20) {
                    status.innerText = "> Ready to sort!";
                } else {
                    status.innerText = "> Number(s) inserted!";
                }
        }
    });

    resetButton.addEventListener("click", function() {
        count = 0;
        arr = [];
        container.innerHTML = "";
        numberInput.value = "";
        capacity.innerHTML = `Capacity: 0/20`;

        status.innerText = "> Capacity cleared!";
    });


    sortButton.addEventListener("click", function() {
        if (arr.length == 0) {
            status.innerText = "> Please add numbers to sort!";
            return;
        }
        status.innerText = "> Adding to buckets...";
        addButton.disabled = true;
        sortButton.disabled = true;
        resetButton.disabled = true;
        shuffle(arr);
    /*for (let i = 0; i < 20; i++) {
        let value = arr[i];

        // Creating element div
        let array_ele = document.createElement("div");

        // Adding class 'block' to div
        array_ele.classList.add("block");

        // Adding style to div
        array_ele.style.height = `${value * 13}px`;
        array_ele.style.transform = `translate(${i * 30}px)`;

        // Creating label element for displaying
        // size of particular block
        let array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        // Appending created elements to index.html
        array_ele.appendChild(array_ele_label);
        container.appendChild(array_ele);
    }*/
        CountingSort();
    });

}

async function InsertionSort(clsnam, delay = 600) {
    status.innerText = "> Sorting bucket using Insertion Sort...";

    let blocks = document.getElementsByClassName(clsnam);
    blocks[0].style.backgroundColor = "rgb(49, 226, 13)";

    for (let i = 1; i < blocks.length; i += 1) {
        let j = i - 1;

        // To store the integer value of ith block to key
        let key = parseInt(blocks[i].childNodes[0].innerHTML);

        // To store the ith block height to height
        let height = blocks[i].style.height;

        // Provide darkblue color to the ith block
        blocks[i].style.backgroundColor = "darkblue";

        // To pause the execution of code for 600 milliseconds
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 600)
        );
        // For placing selected element at its correct position
        while (j >= 0 && parseInt(blocks[j].childNodes[0].innerHTML) > key) {

            // Provide darkblue color to the jth block
            blocks[j].style.backgroundColor = "darkblue";

            // For placing jth element over (j+1)th element
            blocks[j + 1].style.height = blocks[j].style.height;
            blocks[j + 1].childNodes[0].innerText =
                blocks[j].childNodes[0].innerText;
            j = j - 1;

            // To pause the execution of code for 600 milliseconds
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            // Provide lightgreen color to the sorted part
            for (let k = i; k >= 0; k--) {
                blocks[k].style.backgroundColor = " rgb(49, 226, 13)";
            }
        }
        // Placing the selected element to its correct position
        blocks[j + 1].style.height = height;
        blocks[j + 1].childNodes[0].innerHTML = key;

        // To pause the execution of code for 600 milliseconds
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );
        // Provide light green color to the ith block
        blocks[i].style.backgroundColor = " rgb(49, 226, 13)";
    }
}
// Asynchronous CountingSort function
async function CountingSort(delay = 250) {
    
    let blocks = document.querySelectorAll(".block");

   let block1 = 0,
        block2 = 0,
        block3 = 0,
        block4 = 0;

    // CountingSort Algorithm
    for (let i = 0; i < blocks.length; i += 1) {
        blocks[i].style.backgroundColor = "#FF4949";
        let value =
            Number(blocks[i].childNodes[0].innerHTML);

        // Creating element div
        let array_ele = document.createElement("div");

        // Adding style to div
        array_ele.style.height = `${value * 13}px`;

        // Creating label element for displaying
        // size of particular block
        let array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value;

        array_ele.appendChild(array_ele_label);

        // Adding block to first bucket
        if (value >= 1 && value <= 5) {
            array_ele.classList.add("firstbucket");
            var container = document.getElementById("one");
            array_ele.style.transform =
                `translate(${block1 * 30}px)`;
            container.appendChild(array_ele);
            block1++;
        }

        // Adding block to second bucket
        if (value >= 6 && value <= 10) {
            array_ele.classList.add("secondbucket");
            var container = document.getElementById("two");
            array_ele.style.transform =
                `translate(${block2 * 30}px)`;
            container.appendChild(array_ele);
            block2++;
        }

        // Adding block to third bucket
        if (value >= 11 && value <= 15) {
            array_ele.classList.add("thirdbucket");
            var container = document.getElementById("three");
            array_ele.style.transform = `translate(${block3 * 30}px)`;
            container.appendChild(array_ele);
            block3++;
        }

        // Adding block to fourth bucket
        if (value >= 16 && value <= 20) {
            array_ele.classList.add("fourthbucket");
            var container = document.getElementById("four");
            array_ele.style.transform =
                `translate(${block4 * 30}px)`;
            container.appendChild(array_ele);
            block4++;
        }

        // To wait for 250 milliseconds
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delay)
        );

        blocks[i].style.backgroundColor = "#6b5b95";
    }

    // Performing insertion sort on every bucket
    await InsertionSort("firstbucket");
    await InsertionSort("secondbucket");
    await InsertionSort("thirdbucket");
    await InsertionSort("fourthbucket");

    // Copying elements from buckets to main array
    status.innerText = "> Adding to main array...";

    for (let i = 0; i < 4; i++) {
        var bucket_idx = 0;
        var block_idx;

        if (i == 0) block_idx =
            document.getElementsByClassName("firstbucket");
        if (i == 1) block_idx =
            document.getElementsByClassName("secondbucket");
        if (i == 2) block_idx =
            document.getElementsByClassName("thirdbucket");
        if (i == 3) block_idx =
            document.getElementsByClassName("fourthbucket");
        for (var j = i * 5; j < 5 * (i + 1); j++, bucket_idx++) {
            block_idx[bucket_idx].style.backgroundColor = "red";

            // To wait for 300 milliseconds
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );

            blocks[j].style.height =
                block_idx[bucket_idx].style.height;
            blocks[j].childNodes[0].innerText =
                block_idx[bucket_idx].childNodes[0].innerText;
            blocks[j].style.backgroundColor = "green";

            // To wait for 300 milliseconds
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 300)
            );

            block_idx[bucket_idx]
                .style.backgroundColor = "#6b5b95";
        }
    }

    status.innerText = "> Sorting completed!";

    addButton.disabled = false;
    sortButton.disabled = false;
    resetButton.disabled = false;

    confettisrc = confettianimation.src;

    confettianimation.src = "";
    confettianimation.src = confettisrc;
    confettianimation.style.opacity = 1;

    await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 3000)
            );

    confettianimation.style.opacity = 0;

}

// Calling generatearray function
generatearray();