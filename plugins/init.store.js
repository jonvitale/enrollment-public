// note: qdtComponents must be loaded into the Vue prototype
// in a project plugin. Look for qdt.config.js

import uslDef from '~/definitions/usl'
import yearDef from '~/definitions/year'
import researchDef from '~/definitions/research'

// console.log("init.store.js", Vue.prototype, Vue.prototype.$qdt, Vue.prototype.$qlik)

export default async ({ app, store }) => {
  let sessionObject = await app.$qlik.generateHypercubeObjectFromDef(uslDef)
  let values = await app.$qlik.getValuesFromHypercubeObject(sessionObject)
  if (values[Object.keys(values)[0]].length < 1) {
    throw new Error(
      'USL is not returning any values, make sure to check definitions. < 10,000 cells'
    )
  }
  store.dispatch('schools/set_schools', values)

  // get all school years
  sessionObject = await app.$qlik.generateHypercubeObjectFromDef(yearDef)
  values = await app.$qlik.getValuesFromHypercubeObject(sessionObject)
  if (values[Object.keys(values)[0]].length < 1) {
    throw new Error(
      'SchoolYear is not returning any values, make sure to check definitions. < 10,000 cells'
    )
  }
  await store.dispatch('set_years_all', values)
  await app.$qlik.destroySessionObject(sessionObject)

  // get research information
  sessionObject = await app.$qlik.generateHypercubeObjectFromDef(researchDef)
  values = await app.$qlik.getValuesFromHypercubeObject(sessionObject)
  if (values[Object.keys(values)[0]].length < 1) {
    throw new Error(
      'research is not returning any values, make sure to check definitions. < 10,000 cells'
    )
  }
  await store.dispatch('research/set_research', values)
  await app.$qlik.destroySessionObject(sessionObject)

  // the schools store has a hypercube that needs to be set up to determine if there are available catchment students
  await store.dispatch('selections/initialize', app.$qlik)
}
