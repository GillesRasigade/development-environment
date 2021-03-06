var acquit = require('acquit');
var fs = require('fs');

var generate = function ( dir , file ) {

  var content = fs.readFileSync( dir + file ).toString();
  // Parse the contents of the test file into acquit 'blocks'
  var blocks = acquit.parse(content);
  var header = '';
  var doc = 'README';
  var link = dir.replace(testsDir,'./')+doc+'.md';
  // var header = require('fs').readFileSync('./header.md').toString();
  // return;

  var mdOutput = header + '\n\n';

  // For each describe() block
  for (var i = 0; i < blocks.length; ++i) {
    var describe = blocks[i];

    mdOutput += '## ' + describe.contents + '\n\n';
    report += '\n## [' +describe.contents + ']('+link+')\n';
    // console.log(dir.replace(testsDir,'./')+doc+'.md');

    var comment = describe.comments[0] ?
      acquit.trimEachLine(describe.comments[0]) + '\n' :
      '';
    mdOutput += comment + '\n';
    report += comment;

    // This test file only has it() blocks underneath a
    // describe() block, so just loop through all the
    // it() calls.
    for (var j = 0; j < describe.blocks.length; ++j) {
      var it = describe.blocks[j];

      mdOutput += '#### It ' + it.contents + '\n\n';
      report += '- ' +it.contents + '\n';

      mdOutput += it.comments[0] ?
        acquit.trimEachLine(it.comments[0]) + '\n\n' :
        '';
      mdOutput += '```javascript\n';
      mdOutput += '    ' + it.code + '\n';
      mdOutput += '```\n\n';
    }
  }

  if ( fs.existsSync( dir + doc + '.md') ) {
    fs.unlinkSync( dir + doc + '.md');
  }
  console.log('Producing doc: ' + dir + doc + '.md' );
  fs.writeFileSync( dir + doc + '.md', mdOutput);
};

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);

  var isFirst= (undefined === filelist);

  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else if ( /\.test\.js$/.test(file) ) {
      mdOutput = generate(dir,file);
      // filelist.push({dir:dir,file:file});
    }
  });
  return filelist;
};

var testsDir = './tests/';
var report = '# Tests report\n';
var doc = 'README';
console.log('>> Producing tests documentation:');
walkSync(testsDir);

console.log('>> Producing global report');
var doc = 'README';
if ( fs.existsSync( testsDir + doc + '.md') ) {
  fs.unlinkSync( testsDir + doc + '.md');
}
fs.writeFileSync( testsDir + doc + '.md', report);
