// wheel.js
const wheel = new Winwheel({
  canvasId: 'wheelCanvas',
  segments: [ 'Prize A', 'Prize B', 'Prize C', 'Try Again' ],
  onFinish: segment => {
    document.getElementById('prizeField').value = segment.text;
    document.getElementById('winnerForm').style.display = 'block';
  }
});

// Spin trigger (e.g. user click)
document.getElementById('wheelCanvas').addEventListener('click', () => {
  wheel.startAnimation();
});
