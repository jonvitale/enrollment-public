// import initStore from '~/plugins/init.store'
import selectionsDef from '~/definitions/selections'

let sessionObject

export const state = () => ({
  school_fields: ['School Name', 'Current School Name'],
  school: '', // if one-and-only one school is selected
  slug: '',
  current_selections: {},
  session_values: {},
  fields_with_selections: []
})

export const getters = {
  anySelections(state) {
    return state.fields_with_selections.length > 0
  },
  oneSchoolSelected(state) {
    return state.slug.length >= 1
  },
  selectedSchool(state) {
    return state.school
  },
  selectedSchoolPublicationName(state, getters, rootState) {
    if (state.school) {
      const obj = rootState.schools.list.school
        .map(({ text }, index) => ({
          text,
          index
        }))
        .filter(({ text }) => text === state.school)
      if (obj.length > 0) {
        const index = obj[0].index
        return rootState.schools.list.publicationName[index].text
      } else {
        return state.school
      }
    } else {
      return state.school
    }
  },
  hasCatchment(state) {
    if (state.session_values?.hasCatchment?.length > 0 || false) {
      return state.session_values.hasCatchment[0].number === 1
    } else {
      return true
    }
  }
}

export const mutations = {
  set_only_school(state, school) {
    state.school = school
  },
  set_only_slug(state, slug) {
    state.slug = slug
  },
  set_current_selections_in_field(state, { field, selections }) {
    if (selections !== undefined) {
      state.current_selections[field] = selections
    } else {
      delete state.current_selections[field]
    }
    state.fields_with_selections = Object.keys(state.current_selections).filter(
      (field) => state.current_selections[field].length > 0
    )
  },
  set_session_values(state, sessionValues) {
    state.session_values = sessionValues
    state.fields_with_selections = Object.keys(state.current_selections).filter(
      (field) => state.current_selections[field].length > 0
    )
  }
}

export const actions = {
  async initialize({ commit }, qlik) {
    sessionObject = await qlik.generateHypercubeObjectFromDef(selectionsDef)
    sessionObject.on('changed', async () => {
      const sessionValues = await qlik.getValuesFromHypercubeObject(
        sessionObject
      )
      if (sessionValues[Object.keys(sessionValues)[0]].length > 0) {
        commit('set_session_values', sessionValues)
      }
    })
    const sessionValues = await qlik.getValuesFromHypercubeObject(sessionObject)
    if (sessionValues[Object.keys(sessionValues)[0]].length > 0) {
      commit('set_session_values', sessionValues)
    }
  },

  async set_only_school({ commit, dispatch }, school) {
    commit('set_only_school', school)
    if (school) {
      const slug = await dispatch('schools/lookup_slug_by_school', school, {
        root: true
      })
      commit('set_only_slug', slug)
    } else {
      commit('set_only_slug', '')
    }
  },

  async set_current_selections_in_field(
    { state, commit, dispatch },
    { field, selections }
  ) {
    commit('set_current_selections_in_field', { field, selections })
    // for the special case where this is the "school" and a single item is selected set the value in the state
    if (state.school_fields.includes(field)) {
      if (selections.length === 1) {
        await dispatch('set_only_school', selections[0].text)
      } else {
        await dispatch('set_only_school', '')
      }
    }
  },

  async set_current_selections({ state, commit, dispatch }, selectionsByField) {
    // add any fields that had selections, but now do no not, so they can be removed from state
    const currentFields = Object.keys(selectionsByField)
    const previousFieldsToAdd = Object.keys(state.current_selections).filter(
      (field) =>
        state.current_selections[field] && !currentFields.includes(field)
    )
    previousFieldsToAdd.forEach(
      (field) => (selectionsByField[field] = undefined)
    )

    // for each field in the selections update the stored object
    let field, selections
    for (field in selectionsByField) {
      selections = selectionsByField[field]
      commit('set_current_selections_in_field', { field, selections })
      // for the special case where this is the "school" and a single item is selected set the value in the state
      if (state.school_fields.includes(field)) {
        if (selections && selections.length === 1) {
          await dispatch('set_only_school', selections[0].text)
        } else {
          await dispatch('set_only_school', '')
        }
      }
    }
  }
}
