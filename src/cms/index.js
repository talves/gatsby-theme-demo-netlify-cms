import CMS from './cms'
import config from './config.json'

import FileSystemBackend from 'netlify-cms-backend-fs'
console.log('using the shadow cms/index file!')
if (process.env.NODE_ENV === 'development') {
  // config.load_config_file = false
  config.backend = {
    "name": "file-system",
    "api_root": "/api"
  }
  config.display_url = "http://localhost:8000"
  CMS.registerBackend('file-system', FileSystemBackend)
}

CMS.init({config})
