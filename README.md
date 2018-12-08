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
  const [error1, response1] = await withResolve(axios.get('http://xxx/pop.xxx'))()
  if (error1) return

  console.log(response1)

  const body = { /* ... */ }
  const [error2, response2] = await withResolve(axios.post('http://xxx/hourse.xxx', body))()
  if (error2) return

  console.log(response2)

  // สามารถทำ wrapper function สำหรับ axios ได้
  const axiosGetRS = withResolve(axios.get)
  const axiosPostRS = withResolve(axios.post)

  const [error3, response3] = await axiosGetRS('http://xxx/pop.xxx')
  const [error4, response4] = await axiosGetRS('http://xxx/hourse.xxx')

  const [error5, response5] = await axiosPostRS('http://xxx/pop.xxx', body)
  const [error6, response6] = await axiosPostRS('http://xxx/hourse.xxx', body)
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

const getPandas = () => {
  // ...
  return Promise((resolve, reject) => {
    // ...
  })
}

const doSomething = async () => {
  const [errors, results] = await withResolve(
    getName,
    getPandas,
    getAddress,
  )(['010'], undefined, ['010'])

  if (errors.some(e => e != null)) return

  console.log(results)
}

```

## เอกสาร

* [Getting start](docs/GETTING_START.md)
* [Asynchronous action](docs/ASYNC_ACTION.md)
* [Promise instance](docs/PROMISE_INSTANCE.md)
* [Synchronous action](docs/SYNC_ACTION.md)
* [Multiple action](docs/MULTI_ACTION.md)
