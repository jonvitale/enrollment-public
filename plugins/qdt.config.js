import QdtComponents from 'qdt-components'

const host = 'dashboards.philasd.org' // window.location.hostname

const config = {
  host,
  prefix: '',
  port: host === 'localhost' ? 4848 : 443, // window.location.port,
  secure: host === 'localhost' ? window.location.protocol === 'https:' : true,
  appId:
    host === 'localhost'
      ? 'Enrollment - Oct 1 Snapshot'
      : '5bb27291-9904-47d7-a77c-c872126880c8'
}
const connections = {
  vizApi: true,
  engineApi: true
}
const qdtComponents = new QdtComponents(config, connections)

export default ({ app }, inject) => {
  inject('qdt', qdtComponents)
}
