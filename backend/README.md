1. npm install
2. create file ```mongroose-connect.js```
3. set up file 
```
import mongoose from 'mongoose'

const uri = ""
const options = {
  dbName: '',
  user: '',
  pass: '',
}

export default mongoose.connect(uri, options)
```