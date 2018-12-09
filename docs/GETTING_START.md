# Getting start

* In Progress

withResolve เป็น library สำหรับเปลี่ยนรูปแบบของ Promise จาก `resolve(result)/reject(error)` เป็น `resolve([error, result])`

โดยปกติเราจะเขียน code จัดการกับ Promise แบบนี้

```javascript
function getAll() {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

async function doSomething() {
  getAll()
    .then((result) => {
      // ...
    })
    .catch((error) => {
      // ...
    })

  // or

  try {
    const result = getAll()

    // ...
  } cacth(error) {
    // ...
  }
}
```

แต่เมื่อใช้ withResolve วิธีการจัดการกับ Promise จะเปลี่ยนไป

```javascript
import withResolve from '@cdglib/js-resolve-style'

function getAll() {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

async function doSomething() {
  withResolve(getAll)()
    .then(([error, result]) => {
      // ...
    })

  // or

  const [error, result] = await withResolve(getAll)()
}
```

## Syntax

syntax ในการใช้ withResolve คือ

* จะยังไม่พูดถึงการใช้ multiple action และ Synchronous ในตอนนี้

```javascript
withResolve(action)(p1, p0, ..., pn)
```

<b>action</b> คือ สิ่งที่เราจะดำเนินการซึ่งจะอยู่ในรูปแบบของ `function return Promise`, `Promise instance` และ `general function` อย่างใดอย่างหนึ่ง

<b>p</b> คือ parameter ของ action (จะมีกี่ตัวหรือไม่มีเลยก็ขึ้น action ที่ระบุไว้ก่อนหน้า)

```javascript
import withResolve from '@cdglib/js-resolve-style'

function getAll() {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

function getByName(name) {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

function getByNameAndAge(name, age) {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

async function doSomething() {
  // function return Promise
  const [error1, result1] = await withResolve(getAll)()
  const [error2, result2] = await withResolve(getByName)('Somchai')
  const [error3, result3] = await withResolve(getByNameAndAge)('Somchai', 40)
  // or
  const [error4, result4] = await withResolve(() => getAll())()
  const [error5, result5] = await withResolve(() => getByName('Somchai'))()
  const [error6, result6] = await withResolve(() => getByNameAndAge('Somchai', 40))()

  // Promise instance
  const [error7, result7] = await withResolve(getAll())()
  const [error8, result8] = await withResolve(getByName('Somchai'))()

  const promiseIns = getByNameAndAge('Somchai', 40)
  const [error9, result9] = await withResolve(promiseIns)()
}
```

และสิ่งที่ withResolve resolve มาจะเป็น `[error, result]`
ซึ่งจะช่วยให้คุณแยก error ของแต่ละ action ได้ง่ายขึ้น

## Handle Error

ในแต่ละ action ที่ถูกเรียกใช้งานผ่าน withResolve จะได้รับ resolve มาเป็น `[error, result]` เสมอ

meta name | description
--------- | -----------
error | ค่าที่เกิดจากการ reject จาก
result | ค่าที่เกิดจากการ resolve จาก action

* โดยที่ `error !== null` แสดงว่า action นั้นเกิด error

```javascript
import withResolve from '@cdglib/js-resolve-style'

function getAll() {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

function getByName(name) {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

function getByNameAndAge(name, age) {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

async function doSomething() {
  // function return Promise
  const [error1, result1] = await withResolve(getAll)()
  // เพื่อความแน่ใจ
  // คุณอาจจะเช็ค error1 == null หรือ error1 === null ก็ได้
  if (error1) {
    // ...
    return
  }

  console.log(result1)

  const [error2, result2] = await withResolve(getByName)('Somchai')
  if (error2) {
    // ...
    return
  }

  console.log(result2)

  const [error3, result3] = await withResolve(getByNameAndAge)('Somchai', 40)
  if (error3) {
    // ...
    return
  }

  console.log(result3)
}
```
