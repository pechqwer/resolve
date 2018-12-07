# @cdglib/js-resolve-style

สำหรับเปลี่ยนรูปแบบของ Promise จาก `resolve(result)/reject(error)` เป็น `resolve([error, result])`

## วิธีติดตั้ง

```
npm install --save @cdglib/js-resolve-style
```

## วิธีใช้งานเบื้องต้น

### with async action

```javascript
import withResolve from '@cdglib/js-resolve-style'

const getByID = id => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

const getAll = () => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

const doSomething = async () => {
  const getByIDRS = withResolve(getByID)
  const getAllRS = withResolve(getAll)

  const [error1, result1] = await getByIDRS('1234')
  if (error1) return

  console.log(result1)

  const [error2, result2] = await getAllRS()

  if (error2) return

  console.log(result2)

}
```

### with external library eg. axios

```javascript
import axios from 'axios'
import withResolve from '@cdglib/js-resolve-style'

const doSomething = async () => {
  const [error1, result1] = await withResolve(axios.get('your url'))()
  if (error1) return

  console.log(result1)

  const body = {}
  const [error2, result2] = await withResolve(axios.post('your url', body))()
  if (error2) return

  console.log(result2)

  // สามารถทำ wrapper function สำหรับ axios ได้
  const axisoGet = withResolve(axios.get)
  const axisoPost = withResolve(axios.post)

  const [error3, result3] = await axisoGet('your url')
  const [error4, result4] = await axisoGet('your url')

  const [error5, result5] = await axisoPost('your url', body)
  const [error6, result6] = await axisoPost('your url', body)
}
```

### with multi action

```javascript
import withResolve from '@cdglib/js-resolve-style'

const getName = id => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

const getAddress = id => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

const getAllPandaName = () => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

const doSomething = async () => {
  const [error, result] = await withResolve(getName, getAllPandaName, getAddress)(['010'], undefined,['010'])

  if (error.some(e => e != null)) return

  console.log(result)
}

```

## เอกสาร

* [Getting start](docs/GETTING_START.md)
* [Asynchronous action](docs/ASYNC_ACTION.md)
* [Promise instance](docs/PROMISE_INSTANCE.md)
* [Synchronous action](docs/SYNC_ACTION.md)
* [Multiple action](docs/MULTI_ACTION.md)
