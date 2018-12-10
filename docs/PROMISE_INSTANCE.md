# Promise instance

* In Progress

withResolve สามารถทำงานกับ Promise instance ได้

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
  const [error1, result1] = await withResolve(getAll())()
  if (error1) return

  console.log(result1)

  const [error2, result2] = await withResolve(getByName('Somchai'))()
  if (error2) return

  console.log(result2)


  const promiseIns = getByNameAndAge('Somchai', 40)
  const [error3, result3] = await withResolve(promiseIns)()
  if (error2) return

  console.log(result2)
}
```
