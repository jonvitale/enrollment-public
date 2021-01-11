<template>
  <div>
    <Square color="dark">
      <Heading size="large">Select a School </Heading>
    </Square>
    <Square color="tint">
      <div
        v-if="slugs.length > 5"
        ref="search"
        class="inline-flex justify-between w-full mb-4 bg-white appearance-none border border-blue-900  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      >
        <div class="inline-flex">
          <SearchIcon />
          <input
            id="search-filter"
            v-model="searchText"
            class="pl-2 text-blue-900 w-full"
            type="text"
            placeholder=""
          />
        </div>
        <ClearIcon
          v-if="searchText.length > 0"
          class="flex-initial"
          @click="searchText = ''"
        />
      </div>
      <div v-for="slug in slugs" :key="slug">
        <nuxt-link
          v-if="searchForSchoolBySlug(searchText, slug)"
          :to="'/school/' + slug"
          class="inline-block w-full text-left text-blue-800 font-bold uppercase border-b border-blue-400 rounded uppercase border-transparent border-b-2 rounded-b-none py-2 pl-2 focus:outline-none hover:bg-gray-200"
        >
          {{ lookupSchoolBySlug(slug) }}
        </nuxt-link>
      </div>
    </Square>
  </div>
</template>
<script>
import Square from '~sdp-components/PageElements/Square'
import Heading from '~sdp-components/PageElements/Heading'
import SearchIcon from '~sdp-components/Icons/SearchIcon'
import ClearIcon from '~sdp-components/Icons/ClearIcon'

export default {
  components: {
    Square,
    Heading,
    SearchIcon,
    ClearIcon
  },
  data() {
    return {
      searchText: '',
      slugs: [],
      slugToSchoolMap: null
    }
  },
  async created() {
    this.slugs = this.$store.state.schools.list.slug.map((val) => val.text)
    // some slugs are missing, remove those as options
    this.slugs = this.slugs.filter((slug) => slug != null && slug.length > 1)
    console.log('school/created', this.slugs)
    const slugToSchoolMap = {}
    let i, slug, school
    for (i in this.slugs) {
      slug = this.slugs[i]
      school = await this.$store.dispatch('schools/lookup_text_by_slug', {
        slug,
        target: 'school'
      })
      slugToSchoolMap[slug] = school
    }
    this.slugToSchoolMap = slugToSchoolMap
  },
  methods: {
    lookupSchoolBySlug(slug) {
      if (this.slugToSchoolMap) {
        // console.log("1. lookupSchoolBySlug", slug, slug.toLowerCase())
        const school = this.slugToSchoolMap[slug.toLowerCase()]
        // console.log("2. lookupSchoolBySlug", school)
        return school
      } else {
        return null
      }
    },
    searchForSchoolBySlug(searchText, slug) {
      if (this.slugToSchoolMap) {
        // console.log("searchtext", searchText, slug)
        const school = this.lookupSchoolBySlug(slug)
        return school.toLowerCase().includes(searchText.toLowerCase())
      } else {
        return null
      }
    }
  }
}
</script>
