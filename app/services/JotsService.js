import { AppState } from "../AppState.js"
import { Jot } from "../models/Jot.js";
import { loadState, saveState } from "../utils/Store.js";

class JotsService {

  createJot(jotData) {
    const jot = new Jot(jotData)
    console.log('new', jot);
    AppState.jots.push(jot)
    this.saveJots()
  }

  setActiveJot(jotId) {
    const selectedJot = AppState.jots.find(jot => jot.id == jotId)
    console.log('active', selectedJot);
    AppState.activeJot = selectedJot
    console.log(AppState);
  }

  saveActiveJot(newBody) {
    const activeJot = AppState.activeJot
    activeJot.body = newBody
    activeJot.updatedDate = new Date()
    console.log(AppState);
    this.saveJots()
    AppState.emit('activeJot')
  }

  deleteActiveJot() {
    const activeJot = AppState.activeJot
    const indexToRemove = AppState.jots.indexOf(activeJot)
    AppState.activeJot = null
    AppState.jots.splice(indexToRemove, 1)
    this.saveJots()
  }

  saveJots() {
    const jots = AppState.jots
    saveState('jots', jots)
  }

  loadJots() {
    const jots = loadState('jots', [Jot])
    console.log('loaded jots', jots);
    AppState.jots = jots
  }
}

export const jotsService = new JotsService