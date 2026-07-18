(function () {
  var CELL = 25;
  var CX = [-1, -1, -1, 0, 0, 1, 1, 1];
  var CY = [-1, 0, 1, -1, 1, -1, 0, 1];

  var boardCanvas = document.getElementById('paf');
  var boardCtx = boardCanvas.getContext('2d');
  var face = document.getElementById('face');
  var customPanel = document.getElementById('custom');
  var widthInput = document.getElementById('hm');
  var heightInput = document.getElementById('vm');
  var mineInput = document.getElementById('mm');
  var okButton = document.getElementById('custom-ok');
  var statusBar = document.getElementById('p42');

  var X = 16;
  var Y = 16;
  var M = 40;
  var board = [];
  var minesLeft = 40;
  var safeLeft = 216;
  var gameState = 0;
  var timer = 0;
  var seconds = 0;
  var currentLevel = 2;
  var touchMode = 0;
  var touchTimer = 0;
  var touchX = -1;
  var touchY = -1;
  var blinkTimers = [];

  var drawMines = digitDrawer('rm');
  var drawSeconds = digitDrawer('es');

  function cell(y, x) {
    return board[y] && board[y][x];
  }

  function digitDrawer(id) {
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var currentLength = 3;

    return function (value) {
      var text = String(Math.max(0, parseInt(value, 10) || 0));
      if (value < 10) {
        text = '00' + text;
      } else if (value < 100) {
        text = '0' + text;
      }

      if (text.length !== currentLength) {
        canvas.width = text.length * 13;
        currentLength = text.length;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < text.length; i++) {
        context.drawImage(gfd[parseInt(text.charAt(i), 10)], i * 13, 0);
      }
    };
  }

  function waitForAssets(done) {
    var images = gif.concat(gfs, gfd, gfb);
    var remaining = images.length;

    function next() {
      remaining--;
      if (remaining <= 0) {
        done();
      }
    }

    images.forEach(function (image) {
      if (typeof image === 'string') {
        var probe = new Image();
        probe.onload = next;
        probe.onerror = next;
        probe.src = image;
        return;
      }

      if (image.complete) {
        next();
      } else {
        image.onload = next;
        image.onerror = next;
      }
    });
  }

  function addMineCounts(y, x) {
    for (var i = 0; i < 8; i++) {
      var ny = y + CY[i];
      var nx = x + CX[i];
      if (ny >= 0 && ny < Y && nx >= 0 && nx < X) {
        board[ny][nx].count++;
      }
    }
  }

  function createBoard() {
    board = [];
    for (var y = 0; y < Y; y++) {
      board[y] = [];
      for (var x = 0; x < X; x++) {
        board[y][x] = { state: 0, mine: false, count: 0 };
      }
    }

    var planted = 0;
    while (planted < M) {
      var rx = randomInt(X);
      var ry = randomInt(Y);
      if (!board[ry][rx].mine) {
        board[ry][rx].mine = true;
        addMineCounts(ry, rx);
        planted++;
      }
    }

    minesLeft = M;
    safeLeft = X * Y - M;
  }

  function drawCell(x, y) {
    var item = board[y][x];
    if (item.state === 0) {
      boardCtx.drawImage(gfs[0], x * CELL, y * CELL);
    } else if (item.state === 2) {
      boardCtx.drawImage(gfs[1], x * CELL, y * CELL);
    } else if (item.mine) {
      boardCtx.drawImage(gfs[3], x * CELL, y * CELL);
    } else {
      boardCtx.drawImage(gfb[item.count], x * CELL, y * CELL);
    }
  }

  function drawAllClosed() {
    for (var y = 0; y < Y; y++) {
      for (var x = 0; x < X; x++) {
        boardCtx.drawImage(gfs[0], x * CELL, y * CELL);
      }
    }
  }

  function restart() {
    stopTimer(true);
    blinkTimers.forEach(clearInterval);
    blinkTimers = [];
    createBoard();
    resizeBoard();
    face.src = gif[0];
    drawAllClosed();
    drawMines(minesLeft);
    drawSeconds(0);
    touchMode = 0;
    touchX = -1;
    touchY = -1;
    gameState = 0;
    startOpen();
  }

  function resizeBoard() {
    var boardWidth = X * CELL;
    statusBar.style.width = (boardWidth + 4) + 'px';
    boardCanvas.width = boardWidth;
    boardCanvas.height = Y * CELL;
  }

  function startOpen() {
    var bestRun = 0;
    var bestX = -1;
    var bestY = -1;

    for (var x = 0; x < X; x++) {
      var run = 0;
      for (var y = 0; y < Y; y++) {
        if (!board[y][x].mine && board[y][x].count === 0) {
          run++;
        } else {
          if (run > bestRun) {
            bestRun = run;
            bestX = x;
            bestY = y - 1;
          }
          run = 0;
        }
      }

      if (run > bestRun) {
        bestRun = run;
        bestX = x;
        bestY = Y - 1;
      }
    }

    if (bestX >= 0 && bestY >= 0) {
      openCell(bestX, bestY);
    }
  }

  function startTimer() {
    if (gameState !== 0) {
      return;
    }
    seconds = 0;
    gameState = 1;
    timer = window.setInterval(function () {
      seconds++;
      drawSeconds(seconds);
    }, 1000);
  }

  function stopTimer(finalize) {
    if (timer) {
      window.clearInterval(timer);
      timer = 0;
    }
    if (finalize) {
      seconds = 0;
    }
  }

  function openCell(x, y) {
    var item = cell(y, x);
    if (!item || item.state !== 0 || gameState > 1) {
      return;
    }

    item.state = 1;
    if (item.mine) {
      boardCtx.drawImage(gfs[2], x * CELL, y * CELL);
      lose();
      return;
    }

    boardCtx.drawImage(gfb[item.count], x * CELL, y * CELL);
    safeLeft--;
    if (safeLeft === 0) {
      win();
      return;
    }

    if (item.count === 0) {
      for (var i = 0; i < 8; i++) {
        openCell(x + CX[i], y + CY[i]);
      }
    }
  }

  function toggleFlag(x, y) {
    var item = cell(y, x);
    if (!item || item.state === 1 || gameState > 1) {
      return;
    }

    if (item.state === 0 && minesLeft > 0) {
      item.state = 2;
      boardCtx.drawImage(gfs[1], x * CELL, y * CELL);
      minesLeft--;
    } else if (item.state === 2) {
      item.state = 0;
      boardCtx.drawImage(gfs[0], x * CELL, y * CELL);
      minesLeft++;
    }
    drawMines(minesLeft);
  }

  function chord(x, y) {
    var item = cell(y, x);
    if (!item || item.state !== 1 || gameState > 1) {
      return;
    }

    var flagCount = 0;
    var hiddenMineCount = 0;
    for (var i = 0; i < 8; i++) {
      var nx = x + CX[i];
      var ny = y + CY[i];
      var neighbor = cell(ny, nx);
      if (!neighbor) {
        continue;
      }
      if (neighbor.state === 2) {
        flagCount++;
      } else if (neighbor.state === 0 && neighbor.mine) {
        hiddenMineCount++;
      }
    }

    if (flagCount >= item.count && hiddenMineCount) {
      lose();
      return;
    }

    for (var j = 0; j < 8; j++) {
      var openX = x + CX[j];
      var openY = y + CY[j];
      var candidate = cell(openY, openX);
      if (!candidate || candidate.state !== 0) {
        continue;
      }
      if (flagCount >= item.count) {
        openCell(openX, openY);
      } else {
        flashCell(openX, openY);
      }
    }
  }

  function flashCell(x, y) {
    boardCtx.drawImage(gfb[0], x * CELL, y * CELL);
    window.setTimeout(function () {
      var item = cell(y, x);
      if (item && item.state === 0) {
        boardCtx.drawImage(gfs[0], x * CELL, y * CELL);
      }
    }, 120);
  }

  function lose() {
    stopTimer(false);
    face.src = gif[2];
    gameState = 3;

    for (var y = 0; y < Y; y++) {
      for (var x = 0; x < X; x++) {
        var item = board[y][x];
        if (item.state === 0 && item.mine) {
          boardCtx.drawImage(gfs[3], x * CELL, y * CELL);
        } else if (item.state === 2 && !item.mine) {
          startWrongFlagBlink(x, y);
        }
      }
    }
  }

  function startWrongFlagBlink(x, y) {
    var visible = true;
    blinkTimers.push(window.setInterval(function () {
      visible = !visible;
      boardCtx.drawImage(visible ? gfs[1] : gfb[board[y][x].count], x * CELL, y * CELL);
    }, 800));
  }

  function win() {
    gameState = 2;
    stopTimer(false);

    for (var y = 0; y < Y; y++) {
      for (var x = 0; x < X; x++) {
        var item = board[y][x];
        if (item.state === 0 && item.mine) {
          item.state = 2;
          boardCtx.drawImage(gfs[1], x * CELL, y * CELL);
        }
      }
    }

    minesLeft = 0;
    drawMines(0);
    face.src = gif[1];
  }

  function eventPosition(event) {
    var rect = boardCanvas.getBoundingClientRect();
    var x = Math.floor((event.clientX - rect.left) / CELL);
    var y = Math.floor((event.clientY - rect.top) / CELL);
    if (x < 0 || x >= X || y < 0 || y >= Y) {
      return null;
    }
    return { x: x, y: y };
  }

  function handleMouseUp(event) {
    if (touchMode || gameState > 1) {
      return;
    }

    var pos = eventPosition(event);
    if (!pos) {
      return;
    }

    var item = board[pos.y][pos.x];
    startTimer();

    if (event.button === 2) {
      if (item.state === 1) {
        chord(pos.x, pos.y);
      } else {
        toggleFlag(pos.x, pos.y);
      }
    } else if (item.state === 1) {
      chord(pos.x, pos.y);
    } else if (item.state === 2) {
      toggleFlag(pos.x, pos.y);
    } else {
      openCell(pos.x, pos.y);
    }
  }

  function handleTouchStart(event) {
    if (gameState > 1) {
      return;
    }

    touchMode = 1;
    var touch = event.touches[0];
    var pos = eventPosition(touch);
    if (!pos) {
      return;
    }

    touchX = pos.x;
    touchY = pos.y;
    var item = board[pos.y][pos.x];
    if (item.state === 1) {
      chord(pos.x, pos.y);
      return;
    }

    touchTimer = window.setTimeout(function () {
      touchMode = 3;
      startTimer();
      if (item.state === 2) {
        toggleFlag(pos.x, pos.y);
      }
      openCell(pos.x, pos.y);
    }, 320);
  }

  function handleTouchMove() {
    touchMode = 2;
    window.clearTimeout(touchTimer);
  }

  function handleTouchEnd(event) {
    if (touchMode === 1) {
      window.clearTimeout(touchTimer);
      var touch = event.changedTouches[0];
      var pos = eventPosition(touch);
      if (pos) {
        startTimer();
        toggleFlag(pos.x, pos.y);
      }
    }
    touchMode = 3;
    event.preventDefault();
  }

  function setLevel(level) {
    var value = level == null ? localStorage.getItem('ch7') : String(level);
    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight || window.innerHeight;

    if (!value) {
      value = bodyWidth < 560 ? '1' : '2';
    }

    currentLevel = parseInt(value, 10);
    customPanel.hidden = currentLevel !== 5;

    if (currentLevel === 1) {
      X = 9;
      Y = 9;
      M = 10;
    } else if (currentLevel === 2) {
      X = 16;
      Y = 16;
      M = 40;
    } else if (currentLevel === 3) {
      M = 99;
      if (bodyWidth >= bodyHeight) {
        X = 30;
        Y = 16;
      } else {
        X = 16;
        Y = 30;
      }
    } else if (currentLevel === 4) {
      X = parseInt((bodyWidth - 18) / 25, 10);
      Y = parseInt((bodyHeight - 54) / 25, 10);
      X = Math.max(1, X);
      Y = Math.max(1, Y);
      var cells = X * Y;
      if (cells >= 480) {
        M = cells * 0.20625;
      } else {
        M = cells * cells / 5760 + cells / 8;
      }
      M = parseInt(M, 10);
    } else if (currentLevel === 5) {
      X = parseInt(widthInput.value, 10) || 15;
      Y = parseInt(heightInput.value, 10) || 15;
      M = parseInt(mineInput.value, 10) || 20;
      M = Math.min(M, X * Y);
    } else {
      currentLevel = 2;
      X = 16;
      Y = 16;
      M = 40;
    }

    localStorage.setItem('ch7', currentLevel);
    restart();
  }

  function saveCustomAndRestart() {
    localStorage.setItem('df5', widthInput.value + ';' + heightInput.value + ';' + mineInput.value);
    setLevel(5);
  }

  function loadCustomValues() {
    var saved = localStorage.getItem('df5');
    if (!saved) {
      return;
    }

    var values = saved.split(';');
    widthInput.value = values[0] || 15;
    heightInput.value = values[1] || 15;
    mineInput.value = values[2] || 20;
  }

  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function bindEvents() {
    boardCanvas.addEventListener('mouseup', handleMouseUp);
    boardCanvas.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
    boardCanvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    boardCanvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    boardCanvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    face.addEventListener('mouseup', restart);
    okButton.addEventListener('click', saveCustomAndRestart);

    document.querySelectorAll('[data-level]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        setLevel(link.getAttribute('data-level'));
      });
    });
  }

  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  });

  waitForAssets(function () {
    face.src = gif[0];
    loadCustomValues();
    bindEvents();
    setLevel(null);
  });
}());
