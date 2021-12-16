import "./styles.css";

class SnakeGame {
  constructor() {
    this.canvas = document.getElementById("game");
    this.context = this.canvas.getContext("2d");

    document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  init() {
    this.posSnakeX = this.posSnakeY = 10;
    this.posAppleX = this.posAppleY = 5;
    this.tailSize = 5;
    this.trail = [];
    this.gridSize = this.tailCount = 20;
    this.velosityX = this.velosityY = 0;

    this.time = setInterval(this.loop.bind(this), 1000 / 15);
  }

  // Her seyi sifirla
  reset() {
    clearInterval(this.time);

    this.init();
  }

  // Oyunun dongusu
  loop() {
    this.update();
    this.draw();
  }

  // Melumatlari yenile
  update() {
    // Qurd hereket edir
    this.posSnakeX += this.velosityX;
    this.posSnakeY += this.velosityY;

    // Qurd sona geldikde eks terefden cixsin
    if (this.posSnakeX < 0) {
      this.posSnakeX = this.tailCount - 1;
    } else if (this.posSnakeX > this.tailCount - 1) {
      this.posSnakeX = 0;
    } else if (this.posSnakeY < 0) {
      this.posSnakeY = this.tailCount - 1;
    } else if (this.posSnakeY > this.tailCount - 1) {
      this.posSnakeY = 0;
    }

    // Qurd ozunu yeyerse
    this.trail.forEach((n) => {
      if (this.posSnakeX === n.posSnakeX && this.posSnakeY === n.posSnakeY) {
        this.reset();
      }
    });

    // Qurdun her bir pozisiyasini arraye yazdir
    this.trail.push({ posSnakeX: this.posSnakeX, posSnakeY: this.posSnakeY });
    // Qurdun sonundan kes
    while (this.trail.length > this.tailSize) {
      this.trail.shift();
    }

    // Qurd almani yedi
    if (
      this.posSnakeX === this.posAppleX &&
      this.posSnakeY === this.posAppleY
    ) {
      this.tailSize++;

      // Yeni Alma eleve et
      this.posAppleX = Math.floor(Math.random() * this.tailCount);
      this.posAppleY = Math.floor(Math.random() * this.tailCount);
    }

    // Alma Qurdun ustunde yaranarsa yerini deyis
    this.trail.forEach((n) => {
      if (this.posAppleX === n.posSnakeX && this.posAppleY === n.posSnakeY) {
        this.posAppleX = Math.floor(Math.random() * this.tailCount);
        this.posAppleY = Math.floor(Math.random() * this.tailCount);
      }
    });
  }

  draw() {
    // Platform
    this.context.fillStyle = "#969796";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Skor
    this.context.fillStyle = "white";
    this.context.font = "20px Arial";
    this.context.fillText(this.tailSize - 5, 20, 30);

    // Qurd
    this.trail.forEach((x) => {
      this.context.beginPath();
      this.context.arc(
        x.posSnakeX * this.gridSize + 10,
        x.posSnakeY * this.gridSize + 10,
        this.gridSize - 10,
        0,
        2 * Math.PI
      );
      this.context.fillStyle = "#8e441f";
      this.context.fill();
    });

    // Alma
    this.context.beginPath();
    this.context.fillStyle = "green";
    this.context.arc(
      this.posAppleX * this.gridSize + 10,
      this.posAppleY * this.gridSize + 10,
      this.gridSize - 10,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  onKeyPress(e) {
    // sol
    if (e.keyCode === 37 && this.velosityX !== 1) {
      this.velosityX = -1;
      this.velosityY = 0;
    }
    // yuxari
    else if (e.keyCode === 38 && this.velosityY !== 1) {
      this.velosityX = 0;
      this.velosityY = -1;
    }
    // sag
    else if (e.keyCode === 39 && this.velosityX !== -1) {
      this.velosityX = 1;
      this.velosityY = 0;
    }
    //asagi
    else if (e.keyCode === 40 && this.velosityY !== -1) {
      this.velosityX = 0;
      this.velosityY = 1;
    }
  }
}
const game = new SnakeGame();

game.init();
