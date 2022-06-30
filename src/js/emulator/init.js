var coreParameter = new Object();

coreParameter.mem_read = function(address) {
  //if (address >= 0x4000 && address <= 0x57EF) console.log('reading: ' + address.toString(16) + ' ' + memory[address].toString(16));
  return memory[address];
}
coreParameter.mem_write = function(address, value) {
  if (address <= 0x3FFF) return;
  memory[address] = value;
  //if (address >= 0x4000 && address <= 0x57EF)console.log(String.fromCharCode(value))
}
coreParameter.io_read = function(port) { console.log('io read'); return 1; }
coreParameter.io_write = function(port, value) { console.log('io write ' + port + ' ' + value); }

var cpu = new Z80(coreParameter);
