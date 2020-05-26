export const state = () => ({
  school_fields: ['School Name'],
  school: '', // if one-and-only one school is selected
  slug: '',
  current_selections: {}
})

export const getters = {
  oneSchoolSelected(state) {
    return state.slug.length >= 1
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
    state.current_selections[field] = selections
  }
}

export const actions = {
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
    // for each field in the selections update the stored object
    let field, selections
    for (field in selectionsByField) {
      selections = selectionsByField[field]
      commit('set_current_selections_in_field', { field, selections })
      // for the special case where this is the "school" and a single item is selected set the value in the state
      if (state.school_fields.includes(field)) {
        if (selections.length === 1) {
          await dispatch('set_only_school', selections[0].text)
        } else {
          await dispatch('set_only_school', '')
        }
      }
    }
  }
}
