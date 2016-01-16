#!/usr/bin/env node
// > node-debug --save-live-edit --debug-brk --web-port=8081 app.js

for(var i=0; i<5; i++){
  console.log(i);
}
console.log("done");
