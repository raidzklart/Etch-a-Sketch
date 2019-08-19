const body = document.querySelector("body");
        const container = document.querySelector(".container");
        const clearButton = document.querySelector("#clear");
        const eraseButton = document.querySelector("#erase");
        const drawButton = document.querySelector("#draw");
        const setGridButton = document.querySelector("#set-grid-columns");
        const randomColorButton = document.querySelector('#random-colors');
        const toggleGridButton = document.querySelector('#toggle-grid-lines');

        let grid = document.querySelectorAll(".grid");


        let gridColums = 16;
        setGridColumns(gridColums);

        let rainbow = false;
        let gridLinesOn = true;

        drawButton.addEventListener('click', ()=> {
            rainbow = false;
            draw(grid)
            console.log("DRAW pressed");
        })

        clearButton.addEventListener('click', ()=> {
            setGridColumns(gridColums);
            console.log("CLEAR pressed");
        })

        eraseButton.addEventListener('click', ()=> {
            grid = document.querySelectorAll(".grid");
            for (let i = 0; i < grid.length; i++) {
                grid[i].addEventListener('mouseover', (e)=>{
                grid[i].setAttribute("style", "background-color: rgba(187, 196, 204, 0.342);");
                grid[i].classList.remove("drawn")
                })
            }
            
            console.log("ERASE pressed");
        })

        setGridButton.addEventListener('click', getGridColumns);

        randomColorButton.addEventListener('click', ()=>{
            rainbow = true;
        })

        toggleGridButton.addEventListener('click', toggleGridLines)

        function setGridColumns(num) {
            container.innerHTML = '';
            for (let i = 0; i < (num*num); i++) {
                let div = document.createElement("div");
                div.setAttribute("class", "grid");
                container.appendChild(div);
            }
            container.setAttribute('style', `grid-template-rows: repeat(${num}, 1fr)`);
            container.setAttribute('style', `grid-template-columns: repeat(${num}, 1fr)`);
            grid = document.querySelectorAll(".grid");
            draw(grid)
            if(num > 80){
                gridLinesOn = true;
                toggleGridLines();
            }
        }

        function getGridColumns() {
            gridColums = parseInt(window.prompt("How many colums would you like the sketch area to have?"))
            if(gridColums > 128) {
                gridColums = 128
            }
            setGridColumns(gridColums)
        }

        function draw(grid) {
            for (let i = 0; i < grid.length; i++) {
                grid[i].addEventListener('mouseover', (e)=>{
                    if(!rainbow){
                        grid[i].classList.add('drawn');
                        grid[i].setAttribute("style", "background-color: #000;");
                    }else if(rainbow){
                        grid[i].classList.add('drawn');
                        grid[i].classList.add('rainbow');
                        grid[i].setAttribute("style", `background-color: #${Math.floor(Math.random()*16777215).toString(16)};`);
                    }
                })
            }
        }

        function toggleGridLines(){
            for (let i = 0; i < grid.length; i++) {
                if(!gridLinesOn){
                    grid[i].setAttribute("style", "border: 1px solid rgb(135, 167, 196);")
                }else {
                    grid[i].setAttribute("style", "border:1px solid rgba(135, 167, 196, 0);")
                }
                if(grid[i].classList.value.includes("drawn")){
                    grid[i].setAttribute("style", "background-color: #000;");
                }
                if(grid[i].classList.value.includes("rainbow")){
                    grid[i].setAttribute("style", `background-color: #${Math.floor(Math.random()*16777215).toString(16)};`);
                }
            }
            gridLinesOn = !gridLinesOn;
        }