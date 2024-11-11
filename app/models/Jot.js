import { generateId } from "../utils/GenerateId.js"

export class Jot {
  constructor(data) {
    this.id = data.id || generateId()
    this.title = data.title
    this.body = data.body || ''
    this.color = data.color
    this.reportedDate = new Date(data.reportedDate)
    this.updatedDate = data.updatedDate ? new Date(data.updatedDate) : new Date()
  }

  get ListTemplate() {
    return `
    <div onclick="app.JotsController.setActiveJot('${this.id}')" class="card btn text-start mb-2" role="button">
    <span class="d-flex justify-content-between"><b>${this.title}</b><i style="color: ${this.color}" class="mdi mdi-notebook"></i></span>
    </div>
    `
  }

  get ActiveJot() {
    return /*html*/ `
    <div class="d-flex fw-bold fs-4 m-3 g-1 bg-info-subtle">
          <h1><span><i style="color: ${this.color}" class="mdi mdi-notebook"></i></span>${this.title}</h1>
        </div>
        <p>Created On: ${this.ReportedDateFormatted}</p>
        <p>Last Updated: ${this.UpdatedDateFormatted}</p>
        <form onsubmit="app.JotsController.saveActiveJot()" class="p-2">
        <div class="text-end mb-2">
        <button type="submit" class="btn btn-success"><i class="mdi mdi-arrow-down"></i>SAVE</button>
        <button type="button" onclick="app.JotsController.deleteActiveJot()" class="btn btn-danger"><i class="mdi mdi-delete"></i>DELETE</button>
        </div>
          <textarea name="body" id="jot-body" class="form-control bg-white border rounded p-2">${this.body}</textarea>
        </form>
        <p class="text-end fw-bold">Word Count: ${this.wordCount}</p>
        `
  }

  get wordCount() {
    return this.body.split(' ').length
  }

  get ReportedDateFormatted() {
    return this.reportedDate.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  get UpdatedDateFormatted() {
    return this.updatedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}