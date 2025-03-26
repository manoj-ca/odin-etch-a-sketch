const minSize = 1;
const maxSize = 100;
const defaultSize = 16;

function createRows(rows, grid) {
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    grid.appendChild(row);
  }
}

function createCells(cols, rows, pixels) {
  const max = 16777215; // #ffffff
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      rows[i].appendChild(cell);
      cell.style.width = `${pixels}px`;
      cell.style.height = `${pixels}px`;
      const color = Math.floor(Math.random() * max).toString(16);
      const bgColor = `#${color}`; // random color
      cell.addEventListener("mouseenter", () => {
        let opacity = Number(cell.style.opacity);
        if (opacity < 0.1) {
          opacity = 0.1;
        } else {
          opacity += 0.1;
          if (opacity > 1.0) opacity = 1.0;
        }
        cell.style.opacity = opacity;
        cell.style.backgroundColor = bgColor;
      });
    }
  }
}

function createGrid(size, grid) {
  const gridPixels = 600;
  const pixels = Math.round((gridPixels - (2 * size)) / size);
  createRows(size, grid);
  const rows = document.querySelectorAll(".row");
  createCells(size, rows, pixels);
  return rows;
}

function destroyGrid(rows, grid) {
  for (const row of rows) {
    grid.removeChild(row);
  }
}

function getSize() {
  const input = prompt('Enter number of squares per side (1-100): ')
  const size = Number(input);
  if (!Number.isInteger(size)) return defaultSize;
  if (size < minSize) return minSize;
  if (size > maxSize) return maxSize;
  return size;
}

let size = defaultSize;
const grid = document.querySelector(".grid");
let rows = createGrid(size, grid);

const body = document.querySelector("body");
const btn = document.createElement("button");
btn.textContent = "Enter squares per side";
body.insertBefore(btn, grid);

btn.addEventListener('click', () => {
  destroyGrid(rows, grid);
  size = getSize();
  rows = createGrid(size, grid);
});
