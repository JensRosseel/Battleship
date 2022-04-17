document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.user-grid')
    const opponentGrid = document.querySelector('.opponent-grid')
    const userSquares = []
    const opponentSquares = []

    function createBoard(grid, squares) {
        for (let i = 0; i < width*width; i++) {
            const square = document.createElement('div')
            square.dataset.id = i
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard(userGrid, userSquares)
    createBoard(opponentGrid, opponentSquares)
})