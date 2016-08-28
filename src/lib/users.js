import AV from 'leancloud-storage'

const usersCache = {}

export function batchFetchUsers (avObjects, key) {
    return new Promise((resolve, reject) => {
        
        let unCachedUserIds = new Set()
        avObjects.forEach(object => {
            let userPointer = object.get(key)
            if (!userPointer) return
            if (!usersCache[userPointer.id])
                unCachedUserIds.add(userPointer.id)
        })
        if (!unCachedUserIds.size) {
            fillUsers(avObjects, key)
            return resolve(avObjects)
        }
        
        queryUsers(Array.from(unCachedUserIds))
            .then(() => {
                fillUsers(avObjects, key)
                resolve(avObjects)
            })
            .catch(reject)
    })
    
}

function fillUsers (avObjects, key) {
    avObjects.forEach(object => {
        let pointer = object.get(key)
        if (pointer)
            object.set(key, usersCache[pointer.id])
    })
}

function queryUsers (userIds) {
    let query = new AV.Query(AV.User)
    query.containedIn('objectId', userIds)
    return query.find()
        .then(users => {
            users.forEach(user => { usersCache[user.id] = user })
        })
}