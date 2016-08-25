import AV from 'leancloud-storage'

import '../third_party/AV.push'
import config from './config'

let listeners = {}
let push = window.AV.push(config.leancloud)

push.open(function() {
    console.log('连接服务器成功，可以接收推送.')
})

push.on('message', function(data) {
    console.log('receive message: ', data)

    for (let k in listeners) {
        if (k === data._channel && listeners[k])
            listeners[k](data)
    }
})

push.on('reuse', function() {
    console.log('网络中断正在重试...')
})

function send (channels, data) {
    return new Promise ((resolve, reject) => {
        push.send({channels, data}, result => {
            if (result) {
                console.log('send finish.')
                resolve(result)
            } else {
                console.error('send error...')
                reject(result)
            }
        })
    })
}

function addListener (channel, cb) {
    listeners[channel] = cb
    push.subscribe([channel], () => {
        console.log('订阅成功！')
    })
}

function removeListener (channel) {
    delete listeners[channel]
    push.unsubscribe([channel], () => {
        console.log('取消订阅成功！')
    })
}
 
 module.exports = {
     push,
     send,
     addListener,
     removeListener
 }