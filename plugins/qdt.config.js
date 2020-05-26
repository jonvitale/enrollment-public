import QdtComponents from 'qdt-components'

const config = {
  host: window.location.hostname,
  prefix: '',
  port: window.location.hostname === 'localhost' ? 4848 : window.location.port,
  secure: window.location.protocol === 'https:',
  appId:
    window.location.hostname === 'localhost'
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
