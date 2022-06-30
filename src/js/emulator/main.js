cpu.reset();
function cpuLoop() {  
  // calculate FPS
  var startTime = Date.now();
  var cycleTime = startTime - oldCycleTime;
  oldCycleTime = startTime;
  if (cycleCount % 60 == 0) fps_rate = Math.floor(1000 / cycleTime);
  
  // update background
  //context.fillStyle = 'White';
  //context.fillRect(0, 0, canvas.width, canvas.height);
  
  let count = 0;
  while(count < 10000) {
    var tCycles = cpu.run_instruction();
    count++;
  }
  renderArea();
  setTimeout(cpuLoop, 0);
  
  // render FPS to screen
  //context.fillStyle = 'Black';
  //context.font = '10px Monospace';
  //context.fillText('FPS: ' + fps_rate, 768/2-20, 20);
} window.onload = function() { cpuLoop(); }


























