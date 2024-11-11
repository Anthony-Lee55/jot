import { AppState } from "../AppState.js";
import { jotsService } from "../services/JotsService.js";
import { getFormData } from "../utils/FormHandler.js";


export class JotsController {
  constructor() {
    console.log('loaded');
    this.drawJotsList()
    AppState.on('activeJot', this.drawActiveJot)
    AppState.on('jots', this.drawJotsList)
    jotsService.loadJots()
    this.drawActiveJot()
  }

  createJot() {
    event.preventDefault()
    const form = event.target
    const jotData = getFormData(form)
    console.log('submitted', form, jotData);
    jotsService.createJot(jotData)
  }

  drawJotsList() {
    const jots = AppState.jots
    let listContent = ''
    jots.forEach(jot => listContent += jot.ListTemplate)
    const listElm = document.getElementById('jots-list')
    listElm.innerHTML = listContent
    const countElm = document.getElementById('jot-count')
    countElm.innerText = jots.length.toString()
  }

  drawActiveJot() {
    const activeJot = AppState.activeJot
    const activeElm = document.getElementById('active-jot')
    if (activeJot) {
      const activeContent = activeJot.ActiveJot
      activeElm.innerHTML = activeContent
    } else {
      activeElm.innerHTML = `
        <h1 class="text-center p-3 fs-1"> Create or Select a Jot to Start Jotting!<i class="mdi mdi-notebook"></i></h1>
          `
    }
  }

  setActiveJot(jotId) {
    console.log('set active', jotId);
    jotsService.setActiveJot(jotId)
  }

  saveActiveJot() {
    event.preventDefault()
    console.log('saving jot');
    const form = event.target
    const newBody = form.body.value
    console.log('new body', newBody);
    jotsService.saveActiveJot(newBody)
  }

  deleteActiveJot() {
    console.log('deleting jot');
    const confirmed = confirm('Are you sure you want to erase this Jot?')
    if (confirmed == false) return
    jotsService.deleteActiveJot()
  }
}