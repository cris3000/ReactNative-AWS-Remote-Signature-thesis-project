'use strict'
// solution from  https://stackoverflow.com/questions/49701000/how-to-do-unit-testing-in-react-native-that-uses-firebase
//  Reference- Code taken from  https://gist.github.com/choipd/f7d85619107d58a191dacff8a85b4ad0
// Created solely to Mock Firebase for Unit Testing, As Jest Testing does not use actual firebase.

export class Database {
  ref = (path) => {
    if (!this[path]) {
      this[path] = new Reference(path)
    }
    return this[path]
  }
}

export class Reference {
  constructor(path) {
    this.path = path
    this.snap = { val: () => this._val()}
    this.data = null
  }

  _val = jest.fn(() => {
    return this.data
  })

  once = jest.fn((param, callback) => {
    const promise = new Promise ((resolve, reject) => {
      if (callback) {
        callback(this.snap)
        resolve()
      } else {
        resolve(this.snap)
      }
    })
    RNFirebase.promises.push(promise)
    return promise
  })

  on = jest.fn((param, callback) => {
    const promise = new Promise ((resolve, reject) => {
      if (callback) {
        callback(this.snap)
        resolve()
      } else {
        resolve(this.snap)
      }
    })
    RNFirebase.promises.push(promise)
    return promise
  })

  off = jest.fn((param, callback) => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })

  update = jest.fn((data) => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })

  remove = jest.fn(() => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })
}


export class Firestore {
  constructor() {
    this.firestore = () => {
      if(!this.firestoreInstance) {
        this.firestoreInstance = new Firestore()
      }
      return this.firestoreInstance
    }
  }
}

export class MockFirebase {
  constructor() {
    this.database = () => {
      if (!this.databaseInstance) {
        this.databaseInstance = new Database()
      }
      return this.databaseInstance
    }

    this.firestore = () => {
      if(!this.firestoreInstance) {
        this.firestoreInstance = new Firestore()
      }
      return this.firestoreInstance
    }
  }
}

export default class RNFirebase {
  constructor() {
    
  }

  static initializeApp() {
    RNFirebase.firebase = new MockFirebase()
    RNFirebase.promises = []
    return RNFirebase.firebase
  }

  static reset() {
    RNFirebase.promises = []
    RNFirebase.firebase.databaseInstance = null
  }

  static waitForPromises() {
    return Promise.all(RNFirebase.promises)
  }

  static analytics () {}
  
  static app () {}

  static firestore () {
    if(!this.firestoreInstance) {
      this.firestoreInstance = new Firestore()
    }
    return this.firestoreInstance
  }
}