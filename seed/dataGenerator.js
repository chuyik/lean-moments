const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const request = require('request')

const yaml = require('js-yaml')
const AV = require('leancloud-storage')

const config = require('../src/lib/config')

AV.init(config.leancloud)

const seedData = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'data.yml'), 'utf8'))

export function addUsers() {
  let usersData = seedData.users
  
  return Promise.all(usersData.map(data => {
    return Promise.all([uploadAsset(`${data.username}.jpg`),uploadRandomImage()])
      .then(([avatar, cover]) => {
        data.password = data.password || data.username
        data.avatar = avatar
        data.cover  = cover
        return register(data)
      })
      .then(user => {
        console.log(`${user.get('nickname')} is saved.`)
      })
    }))
    .then(() => {
      console.log(`${usersData.length} users added.`)
    })
    .catch(console.error)
}

export function testConnection() {
  let TestObject = AV.Object.extend('TestObject')
  let testObject = new TestObject()
  testObject.save({
    testDate: new Date()
  }).then(() => {
    console.log('LeanCloud works!')
  }).catch(console.error)
}

////////////////////////////

export function uploadRandomImage () {
  return downloadFile('https://unsplash.it/375/255/?random')
    .then(buffer => {
      return new AV.File(_.uniqueId('random_pic_'), buffer).save()
    })
}

function uploadAsset(filename) {
  return uploadFile(path.join(__dirname, 'images', filename))
}

function uploadFile(filepath) {
  return readFile(filepath)
    .then(data => {
      const file = new AV.File(path.basename(filepath), data)
      return file.save()
    })
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

function downloadFile(uri) {
  return new Promise((resolve, reject) => {
    request({uri, encoding: null}, (err, resp, body) => {
      if (err || resp.statusCode !== 200)
        return reject(err)
      else
        return resolve(body)
    })
  })
}

function register(userData) {
  let user = new AV.User()
  user.set(userData)
  return user.signUp()
}