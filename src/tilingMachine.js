import _ from 'underscore';

function group (matrix, minX, minY, maxX, maxY, direction) {
  var minC = minX;
  var maxC = maxX;
  var minQ = minY;
  var maxQ = maxY;
  var joined = 2;
  for (var i = minC; i <= maxC; i++) {
    var isClean = true;
    for (var j = minQ; j <= maxQ; j++) {
      if (matrix[i][j] === joined) {
        isClean = false;
        break;
      }
    }
    if (isClean) {
    }
  }
}

function uniteAndConquer(W,H, percent) {
  var matrix = [];
  for (var k = 0; k < W; k++) {
    matrix[k] = new Array(H);
  }

  for (var i = 0; i < W; i++) {
    for(var j = 0; j < H; j++) {
      if (matrix[i][j] !== undefined) continue;
      if (Math.random() > percent / 2) continue;
      var dir = (Math.random() > 0.5) + 1;  // 1: right, 2: left
      //boundary checks
      if (i === W-1) dir = 2;
      if (j === H-1) dir = 1;
      if (i === W-1 && j === H-1) continue;

      matrix[i][j] = dir;
      if (dir === 1) matrix[i+1][j] = 3;
      else if (dir === 2) matrix[i][j+1] = 4;
    }
  }
  return matrix;
}

/* DEPRECATED AND USELESS. I'm an ass.
 * Flattens out a tree in a list format, so that it can be processed by an iterative algorithm
 * @param tree: an object with a children property. Each of the objects in children
 * are either trees or objects,
 *
 * @param open: any object that must be inserted in the final array any time there is a descent
 * @param close: same as open, but it is inserted at every ascent
 * @param wrapper: an object that wraps the final nodes in the resulting list
 *
 * @returns: an array of objects
 *
 * Implementation details: because the size of the input will always be minimal (generally |tree| > 50),
 * a recursive implementation is adeguate and easier to implement.
 *
 */
function flatten (tree, open, close) {
  var len = tree.children.length;
  return _.reduce(tree.children, (memo, child, i) => {
    if (open !== undefined && i === 0) memo.push(open);
    if (child.children) memo = memo.concat(flatten(child, open, close));
    else memo.push(child);
    if (close !== undefined && i === len - 1) memo.push(close);
    return memo;
  }, []);
}

export default function () {
  console.log(uniteAndConquer(20, 30, 0.5));
  // console.log("flatten");
  // return {children: [{title:'foo', type:'child'}, {children: [{title:"Lorem", type:'child'}, {title:"Ipsum", type:'child'}, {children: [{title:"Whoo", type:'child'}]}]}, {title:'de', type:'child'}]}, {type:'open'}, {type:'close'};
  // console.log(flatten(obj));
}
