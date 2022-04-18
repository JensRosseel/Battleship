document.addEventListener('DOMContentLoaded', () => {
    const width = 10
    const userGrid = document.querySelector('.user-grid')
    const opponentGrid = document.querySelector('.opponent-grid')
    const userSquares = []
    const opponentSquares = []
    const shipsDisplay = document.querySelector('.ships-display')
    const ships = document.querySelectorAll('.ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const battleship = document.querySelector('.battleship-container')
    const carrier = document.querySelector('.carrier-container')
    const rotateButton = document.querySelector('#rotate')
    const startButton = document.querySelector('#start')
    const turnDisplay = document.querySelector('#turn')
    const infoDisplay = document.querySelector('#info')
    let isHorizontal = true
    let isGameOver = false
    let currentPlayer = 'user'

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

    ships.forEach(ship => ship.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart))
    userSquares.forEach(square => square.addEventListener('dragover', dragOver))
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter))
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave))
    userSquares.forEach(square => square.addEventListener('drop', dragDrop))
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd))
  
    let selectedShipNameWithIndex
    let draggedShip
    let draggedShipLength
  
    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
      selectedShipNameWithIndex = e.target.id
      console.log(selectedShipNameWithIndex)
    }))
  
    function dragStart() {
      draggedShip = this
      draggedShipLength = this.childNodes.length
      console.log(draggedShip)
    }
  
    function dragOver(e) {
      e.preventDefault()
    }
  
    function dragEnter(e) {
      e.preventDefault()
    }
  
    function dragLeave() {
      console.log('drag leave')
    }
  
    function dragDrop() {
      let shipNameWithLastId = draggedShip.lastChild.id
      let shipClass = shipNameWithLastId.slice(0, -2)
      console.log(shipClass)
      let lastShipIndex = parseInt(shipNameWithLastId.substr(-1))
      let shipLastId = lastShipIndex + parseInt(this.dataset.id)
      console.log(shipLastId)
      const notAllowedHorizontal = [0,10,20,30,40,50,60,70,80,90,1,11,21,31,41,51,61,71,81,91,2,22,32,42,52,62,72,82,92,3,13,23,33,43,53,63,73,83,93]
      const notAllowedVertical = [99,98,97,96,95,94,93,92,91,90,89,88,87,86,85,84,83,82,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60]
      
      let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex)
      let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex)
  
      selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1))
  
      shipLastId = shipLastId - selectedShipIndex
      console.log(shipLastId)
  
      if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)) {
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass)
        }
      } else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)) {
        for (let i=0; i < draggedShipLength; i++) {
          userSquares[parseInt(this.dataset.id) - selectedShipIndex + width*i].classList.add('taken', shipClass)
        }
      } else return
  
      shipsDisplay.removeChild(draggedShip)
    }
  
    function dragEnd() {
      console.log('dragend')
    }

    function rotate() {
        if (isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = false
            console.log(isHorizontal)
            return
        }
        if (!isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = true
            console.log(isHorizontal)
            return
        }
    }
    rotateButton.addEventListener('click', rotate)

    const shipArray = [
      {
        name: 'destroyer',
        directions: [
          [0, 1],
          [0, width]
        ]
      },
      {
        name: 'submarine',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'cruiser',
        directions: [
          [0, 1, 2],
          [0, width, width*2]
        ]
      },
      {
        name: 'battleship',
        directions: [
          [0, 1, 2, 3],
          [0, width, width*2, width*3]
        ]
      },
      {
        name: 'carrier',
        directions: [
          [0, 1, 2, 3, 4],
          [0, width, width*2, width*3, width*4]
        ]
      },
    ]

    function generate(ship) {
      let randomDirection = Math.floor(Math.random() * ship.directions.length)
      let current = ship.directions[randomDirection]
      if (randomDirection === 0) direction = 1
      if (randomDirection === 1) direction = 10
      let randomStart = Math.abs(Math.floor(Math.random() * opponentSquares.length - (ship.directions[0].length * direction)))
  
      const isTaken = current.some(index => opponentSquares[randomStart + index].classList.contains('taken'))
      const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1)
      const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0)
  
      if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => opponentSquares[randomStart + index].classList.add('taken', ship.name))
  
      else generate(ship)
    }
    generate(shipArray[0])
    generate(shipArray[1])
    generate(shipArray[2])
    generate(shipArray[3])
    generate(shipArray[4])
  
    function playGame() {
      if (isGameOver) return
      if (currentPlayer === 'user') {
        turnDisplay.innerHTML = "Player 1's turn"
        opponentSquares.forEach(square => square.addEventListener('click', function(e) {
          revealSquare(square)
        }))
      }
      if (currentPlayer === 'opponent') {
        turnDisplay.innerHTML = "Player 2's turn"
        setTimeout(opponentTurn, 1000)
      }
    }
    startButton.addEventListener('click', playGame)
  
    let destroyerCount = 0
    let submarineCount = 0
    let cruiserCount = 0
    let battleshipCount = 0
    let carrierCount = 0
  
  
    function revealSquare(square) {
      if (!square.classList.contains('hit')) {
        if (square.classList.contains('destroyer')) destroyerCount++
        if (square.classList.contains('submarine')) submarineCount++
        if (square.classList.contains('cruiser')) cruiserCount++
        if (square.classList.contains('battleship')) battleshipCount++
        if (square.classList.contains('carrier')) carrierCount++
      }
      if (square.classList.contains('taken')) {
        square.classList.add('hit')
      } else {
        square.classList.add('miss')
      }
      checkForWins()
      currentPlayer = 'opponent'
      playGame()
    }
  
    let oppDestroyerCount = 0
    let oppSubmarineCount = 0
    let oppCruiserCount = 0
    let oppBattleshipCount = 0
    let oppCarrierCount = 0

    function opponentTurn() {
      let random = Math.floor(Math.random() * userSquares.length)
      if (!userSquares[random].classList.contains('hit')) {
        userSquares[random].classList.add('hit')
        if (userSquares[random].classList.contains('destroyer')) oppDestroyerCount++
        if (userSquares[random].classList.contains('submarine')) oppSubmarineCount++
        if (userSquares[random].classList.contains('cruiser')) oppCruiserCount++
        if (userSquares[random].classList.contains('battleship')) oppBattleshipCount++
        if (userSquares[random].classList.contains('carrier')) oppCarrierCount++
        checkForWins()
      } else opponentTurn()
      currentPlayer = 'user'
      turnDisplay.innerHTML = "Player 1's Turn"
    }

    function checkForWins() {
      if (destroyerCount === 2) {
        infoDisplay.innerHTML = 'You sunk the opponents destroyer'
        destroyerCount = 10
      }
      if (submarineCount === 3) {
        infoDisplay.innerHTML = 'You sunk the opponents submarine'
        submarineCount = 10
      }
      if (cruiserCount === 3) {
        infoDisplay.innerHTML = 'You sunk the opponents cruiser'
        cruiserCount = 10
      }
      if (battleshipCount === 4) {
        infoDisplay.innerHTML = 'You sunk the opponents battleship'
        battleshipCount = 10
      }
      if (carrierCount === 5) {
        infoDisplay.innerHTML = 'You sunk the opponents carrier'
        carrierCount = 10
      }
      if (oppDestroyerCount === 2) {
        infoDisplay.innerHTML = 'You sunk the opponents Destroyer'
        oppDestroyerCount = 10
      }
      if (oppSubmarineCount === 3) {
        infoDisplay.innerHTML = 'You sunk the opponents Submarine'
        oppSubmarineCount = 10
      }
      if (oppCruiserCount === 3) {
        infoDisplay.innerHTML = 'You sunk the opponents Cruiser'
        oppCruiserCount = 10
      }
      if (oppBattleshipCount === 4) {
        infoDisplay.innerHTML = 'You sunk the opponents Battleship'
        oppBattleshipCount = 10
      }
      if (oppCarrierCount === 5) {
        infoDisplay.innerHTML = 'You sunk the opponents Carrier'
        oppCarrierCount = 10
      }
      if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
        infoDisplay.innerHTML = "YOU WIN"
        gameOver()
      }
      if ((oppDestroyerCount + oppSubmarineCount + oppCruiserCount + oppBattleshipCount + oppCarrierCount) === 50) {
        infoDisplay.innerHTML = "opponent WINS"
        gameOver()
      }
    }
  
    function gameOver() {
      isGameOver = true
      startButton.removeEventListener('click', playGame)
    }
  
})