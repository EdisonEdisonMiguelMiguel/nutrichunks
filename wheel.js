## 3. wheel.js
```js
window.addEventListener('DOMContentLoaded', () => {
  // initialize
  const wheel = new Winwheel({
    canvasId: 'wheelCanvas',
    numSegments: 6,
    outerRadius: 180,
    textFontSize: 14,
    segments: [
      { fillStyle: '#eae56f', text: 'Prize A' },
      { fillStyle: '#89f26e', text: 'Prize B' },
      { fillStyle: '#7de6ef', text: 'Prize C' },
      { fillStyle: '#e7706f', text: 'Prize D' },
      { fillStyle: '#eae56f', text: 'Try Again' },
      { fillStyle: '#89f26e', text: 'Prize E' }
    ],
    animation: {
      type: 'spinToStop',
      duration: 5,
      spins: 8,
      callbackFinished: onSpinComplete
    }
  });

  // draw initial state
  wheel.draw();

  // spin on click
  document.getElementById('wheelCanvas').addEventListener('click', () => {
    wheel.startAnimation();
  });

  // show form
  function onSpinComplete(indicatedSegment) {
    document.getElementById('prizeField').value = indicatedSegment.text;
    document.getElementById('winnerForm').style.display = 'block';
  }

  // form submit
  document.getElementById('winnerForm').addEventListener('submit', async e => {
    e.preventDefault();
    const fm = new FormData(e.target);
    const payload = {
      name:  fm.get('name'),
      email: fm.get('email'),
      phone: fm.get('phone'),
      prize: fm.get('prize')
    };
    try {
      const res = await fetch('https://script.google.com/macros/s/ABC123/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.status === 'OK') {
        alert('✅ Prize logged!');
        e.target.reset();
        e.target.style.display = 'none';
      } else throw new Error(json.message);
    } catch (err) {
      alert('❌ Error: ' + err.message);
    }
  });
});
```
