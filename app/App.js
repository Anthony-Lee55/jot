import { router } from './router-config.js';
import { HomeController } from './controllers/HomeController.js';
import { JotsController } from './controllers/JotsController.js';
const USE_ROUTER = false

class App {


  JotsController = new JotsController()
  // HomeController = new HomeController()

  constructor() {
    if (USE_ROUTER) {
      this.router = router
      this.router.init(this)
    }
  }

}

const app = new App()
// @ts-ignore
window.app = app
