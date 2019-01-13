# module

es6module example

提供了
- `browser`
- `nodejs`
- `webpack`
- `rollup`

4种供 `es6 module` 运行的环境 

## `ES6 Module` 语法 ##

### export ###

```javascript
export * from 'module'; //重定向导出 不包括 module内的default
export { name1, name2, ..., nameN } from 'module'; // 重定向命名导出
export { import1 as name1, import2 as name2, ..., nameN } from 'module'; // 重定向重命名导出

export { name1, name2, …, nameN }; // 与之前声明的变量名绑定 命名导出
export { variable1 as name1, variable2 as name2, …, nameN }; // 重命名导出

export let name1 = 'name1'; // 声明命名导出 或者 var, const，function， function*, class

export default expression; // 默认导出
export default function () { ... } // 或者 function*, class
export default function name1() { ... } // 或者 function*, class
export { name1 as default, ... }; // 重命名为默认导出
```

#### `export` 规则 ####

- `export * from ''` 或者 `export {} from ''`，重定向导出，重定向的命名并不能在本模块使用，只是搭建一个桥梁，例如：这个`a`并不能在本模块内使用
- `export {}`， 与变量名绑定，命名导出
- `export Declaration`，声明的同时，命名导出， [Declaration][2]就是： `var`, `let`, `const`, `function`, `function*`, `class` 这一类的声明语句
- `export default AssignmentExpression`，默认导出， [AssignmentExpression][3]的 范围很广，可以大致理解 为除了声明`Declaration`（其实两者是有交叉的），`a=2`,`i++`,`i/4`,`a===b`,`obj[name]`,`name in obj`,`func()`,`new P()`,`[1,2,3]`,`function(){}`等等很多

### import ###

```javascript
// 命名导出 module.js
let a = 1,b = 2
export { a, b }
export let c = 3

// 命名导入 main.js
import { a, b, c } from 'module'; // a: 1  b: 2  c: 3
import { a as newA, b, c as newC } from 'module'; // newA: 1  b: 2  newC: 3


// 默认导出 module.js
export default 1

// 默认导入 main.js
import defaultExport from 'module'; // defaultExport: 1


// 混合导出 module.js
let a = 1
export { a }
const b = 2
export { b }
export let c = 3
export default [1, 2, 3]

// 混合导入 main.js
import defaultExport, { a, b, c as newC} from 'module'; //defaultExport: [1, 2, 3]  a: 1  b: 2  newC: 3
import defaultExport, * as name from 'module'; //defaultExport: [1, 2, 3]  name: { a: 1, b: 2, c: 3 }
import * as name from 'module'; // name: { a: 1, b: 2, c: 3, default: [1, 2, 3] }


// module.js
Array.prototype.remove = function(){}

//副作用 只运行一个模块
import 'module'; // 执行module 不导出值  多次调用module.js只运行一次

//动态导入(异步导入)
var promise = import('module');
```

#### `import` 规则 ####

- `import { } from 'module'`， 导入`module.js`的**命名导出**
- `import defaultExport from 'module'`， 导入`module.js`的**默认导出**
- `import * as name from 'module'`， 将`module.js的`的**所有导出**合并为`name`的对象，`key`为导出的命名，默认导出的`key`为`default`
- `import 'module'`，副作用，只是运行`module`，不为了导出内容例如 polyfill，多次调用次语句只能执行一次
- `import('module')`，动态导入返回一个 `Promise`，`TC39`的`stage-3`阶段被提出 [tc39 import][4]

[1]:https://github.com/nodejs/node/blob/master/lib/internal/modules/cjs/loader.js
[2]:http://www.ecma-international.org/ecma-262/6.0/#sec-statements
[3]:http://www.ecma-international.org/ecma-262/6.0/#sec-expressions
[4]:https://github.com/tc39/proposal-dynamic-import/#import
