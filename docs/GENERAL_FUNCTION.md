# Genaral function

* In Progress

withResolve สามารถทำงานกับ function ที่ function ทั่วไปได้

```javascript
import withResolve from '@cdglib/js-resolve-style'

const addNum = (a, b) => a + b

async function doSomething() {
  const [_, result] = await withResolve(addNum)()
  // ...
}
```

แต่ในความเป็นจริงก็ได้จำเป็นต้องใช้ withResolve ถ้าเกิดใน function นั้นไม่มีการ throw exception
เพราะว่า function ไม่มีทางส่ง error กับมาผ่าน with resolve

```javascript
import withResolve from '@cdglib/js-resolve-style'

function addNum(a, b) {
  if (typeof(a) !== 'number') throw new Error('a is not a number')
  if (typeof(b) !== 'number') throw new Error('b is not a number')

  return a + b
}

async function doSomething() {
  const [error, result] = await withResolve(addNum)()
  // ...
}
```
