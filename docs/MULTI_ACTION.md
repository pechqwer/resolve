# Multiple action

* In Progress

withResolve สามารถทำงานกับ multiple action ได้

ซึ่ง action ในที่นี้จะหมายถึง `function return Promise instance`, `Promise instance` และ `general function`

ซึ่งหลักการทำงานคล้ายกับ `Promise.all` แต่จะมาความต่างอยู่บ้าง

## Syntax

```javascript
withResolve(action1 , action2, ..., actionn)(params1, params0, ..., paramsn)
```

<b>action</b> คือ สิ่งที่เราจะดำเนินการซึ่งจะอยู่ในรูปแบบของ `function return Promise instance`, `Promise instance` และ `general function` อย่างใดอย่างหนึ่ง และถ้า action มีมากกว่า จะถือว่าเป็นการทำงาน แบบ multiple action

<b>params</b> คือ parameters ของ action (จะมีกี่ตัวหรือไม่มีเลยก็ขึ้น action ที่ระบุไว้ก่อนหน้า)

ซึ่งลำดับ action กับ params จะต้องตรงกัน เช่น params ตำแหน่งที่ 1 คือ parameter ของ action ที่ 1

ซึ่งอย่างที่บอกไปข้างต้องว่า ลักษณะของ params ขึ้นอยู่กับ action

โดยถ้า action นั้นต้องการรับ parameter ให้ระบุ params เป็น Array ที่มี parameter อยู่ข้างใน `[...parameter]`

แต่ถ้า action นั้นไม่ต้องการรับ parameter ให้ระบุ params ในรูป `[]` หรือ `undefined`

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
  const [errors, results] = await withResolve(
    getAll,
    getByName,
    getByNameAndAge,
  )(undefined, ['Somsri'], ['Somsri', 28])
  // ...
}
```

## Handle Error

สำหรับ multiple action errors กับ results จะตอบกลับเป็น array ขนาดเท่ากับจำนวน action

* errors มีค่าใน array เป็น null ทั้งหมดแสดงว่ามี action ที่นั้นเกิด error

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
  const [errors, results] = await withResolve(
    getAll,
    getByName,
    getByNameAndAge,
  )(undefined, ['Somsri'], ['Somsri', 28])

  // คุณอาจจะเช็ค errors[0] != null หรือ errors[0] !== null ก็ได้
  if (errors[0]) { // error from getAll
    // ...
    return
  }

  console.log(results[0]) // result from getAll

  if (errors[1]) { // error from getByName
    // ...
    return
  }

  console.log(results[1]) // result from getByName

  if (errors[2]) { // error from getByNameAndAge
    // ...
    return
  }

  console.log(results[2]) // result from getByNameAndAge
}
```

หรือจะ validation error แบบไม่สนใจตำแหน่งก็ได้

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
  const [errors, results] = await withResolve(
    getAll,
    getByName,
    getByNameAndAge,
  )(undefined, ['Somsri'], ['Somsri', 28])

  if (errors.some(error => error != null)) return

  console.log(results)
}
```
