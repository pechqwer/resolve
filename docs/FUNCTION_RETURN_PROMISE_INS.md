# Function return Promise instance

* In Progress

withResolve สามารถทำงานกับ function ที่ return Promise instance ได้

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
  const [error1, result1] = await withResolve(getAll)()
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

ในกรณีที่เป็น function เราสามารถ สร้าง method ใหม่ด้วย with resolve ได้เลย

```javascript
import withResolve from '@cdglib/js-resolve-style'

const getAll = withResolve(() => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
})

const getByName = withResolve((name) => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
})

const getByNameAndAge = withResolve((name, age) => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
})

async function doSomething() {
  const [error1, result1] = await getAll()
  if (error1) {
    // ...
    return
  }

  console.log(result1)

  const [error2, result2] = await getByName('Somchai')
  if (error2) {
    // ...
    return
  }

  console.log(result2)

  const [error3, result3] = await getByNameAndAge('Somchai', 40)
  if (error3) {
    // ...
    return
  }

  console.log(result3)
}
```

หรือถ้ามี function เก่าอยู่แล้ว ก็สามารถทำ wrapper function โดยไม่ต้องแก้ code เก่าก็ได้

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

// สร้าง wrapper function
const getAllRS = withResolve(getAll)
const getByNameRS = withResolve(getByName)


async function oldCode() {
  try {
    const result1 = await getAll()
    // ...
    const result2 = await getByName('Somchai')
    // ...
  } catch(error) {
    // ...
    console.log(error)
  }
}

async function newCode() {
  const [error1, result1] = await getAllRS()
  const [error2, result2] = await getByNameRS('Somchai')
}
```
