# @cdglib/js-resolve-style

สำหรับเปลี่ยนรูปแบบของ Promise จาก resolve(result)/reject(error) เป็น resolve([error, result])

## วิธีติดตั้ง
```
npm install --save @cdglib/js-resolve-style
```

## วิธีใช้งาน
### Promise
```javascript
import withResolve from '@cdglib/js-resolve-style'

const getName = id => {
  // ...

}

// promise style
const doSomething = () => {
  getName('010')
    .then((result) => {
      // ...

    })
    .catch((error) => {
      // ...

    })
}

// promise with resolve style
const doSomethingAgain = () => {
  const getNameWithResolve = withResolve(getName)

  getNameWithResolve('010')
    .then(([error, result]) => {
      if (error) return
      // ...

    })
}
```

### Async/Await
```javascript
import withResolve from '@cdglib/js-resolve-style'

const getName = id => {
  // ...

}

// async/await style
const doSomething = async () => {
  try {
    const result = await getName('010')
    // ...

  } catch (error) {
    // ...

  }
}

// async/await with resolve style
const doSomethingAgain = async () => {
  const getNameWithResolve = withResolve(getName)

  const [error, result] = await getNameWithResolve('010')

  if (error) return
  // ...

}
```

### Multiple function
```javascript
import withResolve from '@cdglib/js-resolve-style'

const getName = id => {
  // ...

}

const getAddress = id => {
  // ...

}

const getSalary = id => {
  // ...

}

// async/await with resolve style
const doSomething = async () => {
  const getAll = withResolve(getName, getAddress, getSalary)

  const [error, result] = await getAll(['010'],['010'],['010'])

  if (error[0]) { /* error of getName --> do something */ }
  console.log(result[0]) // date of getName

  if (error[1]) { /* error of getAddress --> do something */ }
  console.log(result[1]) // date of getAddress

  if (error[2]) { /* error of getSalary --> do something */ }
  console.log(result[2]) // date of getSalary
}
```

or

```javascript
import withResolve from '@cdglib/js-resolve-style'

const getName = id => {
  // ...

}

const getAddress = id => {
  // ...

}

const getSalary = id => {
  // ...

}

const doSomething = async () => {
  const getAll = withResolve(
    () => getName('101'),
    () => getAddress('101'),
    () => getSalary('101'),
  )

  const [error, result] = await getAll()

  if (error[0]) { /* error of getName --> do something */ }
  console.log(result[0]) // date of getName

  if (error[1]) { /* error of getAddress --> do something */ }
  console.log(result[1]) // date of getAddress

  if (error[2]) { /* error of getSalary --> do something */ }
  console.log(result[2]) // date of getSalary
}
```

## Format ของ withResolve
```javascript
withResolve = (...func) => (...params) => new Promise(/*...*/)

const newFn = withResolve(oldFunt)
newFn()
  .then(([error, result]) => {
    // ...

  })

```

## Parameter ของ function `withResolve`
name | type | description
---- | ---- | -----------
`func` | Function | function ที่ต้องการเปลี่ยนรูปแบบของ Promise จาก resolve(result)/reject(error) เป็น resolve([error, result])
`params` | Any | เป็น parameter ของ function ที่ก่อนหน้า

## Promise resolve ของ function `withResolve`
name | type | description
---- | ---- | -----------
`error` | Function | เป็นค่าเออเร่อของ function
`result` | Any | เป็นค่าผลลัพธ์ของ function
