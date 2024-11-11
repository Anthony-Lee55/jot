import { Jot } from './models/Jot.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  jots = [
    new Jot({
      title: 'ToDo',
      reportedDate: '11/11/2024',
      body: "this is this is this is this is this is this is this is this is this is this is this is this"
    }),
    new Jot({
      title: 'Homework',
      reportedDate: '11/11/2024',
      body: "this is this is this is this is this is this is this is this is this is this is this is this"
    }),
    new Jot({
      title: 'ToDo',
      reportedDate: '11/11/2024',
      body: "this is this is this is this is this is this is this is this is this is this is this is this"
    })
  ]

  /**@type {Jot} */
  activeJot = null

  /**@type {import('./models/Example.js').Example[]} */
  examples = []
}

export const AppState = createObservableProxy(new ObservableAppState())