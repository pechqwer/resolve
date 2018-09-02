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
    .then((name) => {
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
    .then(([error, name]) => {
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
    const name = await getName('010')
    // ...

  } catch (error) {
    // ...

  }
}

// async/await with resolve style
const doSomethingAgain = async () => {
  const getNameWithResolve = withResolve(getName)

  const [error, name] = await getNameWithResolve('010')

  if (error) return
  // ...

}
```

## Format ของ withResolve
```javascript
const withResolve = (func) => (...params) => new Promise(/*...*/)

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
