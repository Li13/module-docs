const express = require("express")

const app = express()

app.use(express.static('www'))

const port = 8881
app.listen(port, () => {
    console.log(`服务器启动 端口：${port}`)
    console.log(`http://127.0.0.1:${port}`)
})