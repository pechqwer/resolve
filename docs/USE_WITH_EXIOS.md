# Use with axios

* In Progress

ในหัวข้อนี้จะเป็น ตัวอย่างการใช้งาน withResolve กับ axios

```javascript
import axios from 'axios'
import withResolve from '@cdglib/js-resolve-style'

async function doSomething() {
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
