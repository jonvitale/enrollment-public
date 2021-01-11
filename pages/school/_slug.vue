<template>
  <div>
    <h1 class="text-center">About {{ school }}</h1>
    <Square color="dark" class="flex flex-row mb-12 items-center">
      <p class="w-1/2">
        {{ school }} is a {{ sector }} {{ schoolLevel }} school
        {{ network }} with {{ countEnrollment | numeral('0,0') }} students
        enrolled on October 1st. The school is located at {{ address }}
        {{ zipCode }}.
        {{ criteria }}
      </p>
      <QdtComponent class="w-1/2" type="QdtViz" :props="map" />
    </Square>
    <Square
      v-if="hasCatchment"
      color="tint"
      class="flex flex-row mb-12 items-center"
    >
      <unicono-gram
        class="w-1/2 bg-white"
        :values="[
          {
            count: countCatchmentIn,
            icon: 'building',
            color: '#3c52a1',
            label: 'In-Catchment'
          },
          {
            count: countCatchmentOutCityWide,
            icon: 'building',
            color: '#6dcff6',
            label: 'City-Wide'
          },
          {
            count: countCatchmentOutOtherNeighborhood,
            icon: 'building',
            color: '#3aab48',
            label: 'Other Neighborhood School'
          },
          {
            count: countCatchmentOutCharter,
            icon: 'building',
            color: '#ae1c3e',
            label: 'Charter'
          },
          {
            count: countCatchmentOutOther,
            icon: 'building',
            color: '#888888',
            label: 'Other'
          }
        ]"
      />
      <div class="w-1/2">
        <p>
          {{ countCatchment | numeral('0,0') }} students were assigned to
          {{ abbreviated }}
          from the local catchment area (neighborhood). Of these
          {{ countCatchmentIn | numeral('0,0') }} ({{
            (countCatchmentIn / countCatchment) | numeral('0.0%')
          }}) chose to attend {{ abbreviated }}. <br />
          <br />
          Other students in the catchment chose to attend:
        </p>
        <ul class="pl-8">
          <li v-if="countCatchmentOutCityWide">
            City-Wide Schools:
            {{ countCatchmentOutCityWide | numeral('0,0') }} ({{
              (countCatchmentOutCityWide / countCatchment) | numeral('0.0%')
            }})
          </li>
          <li v-if="countCatchmentOutOtherNeighborhood">
            Other Neighborhood Schools:
            {{ countCatchmentOutOtherNeighborhood | numeral('0,0') }} ({{
              (countCatchmentOutOtherNeighborhood / countCatchment)
                | numeral('0.0%')
            }})
          </li>
          <li v-if="countCatchmentOutCharter">
            Charters: {{ countCatchmentOutCharter | numeral('0,0') }} ({{
              (countCatchmentOutCharter / countCatchment) | numeral('0.0%')
            }})
          </li>
          <li v-if="countCatchmentOutOther">
            Others: {{ countCatchmentOutOther | numeral('0,0') }} ({{
              (countCatchmentOutOther / countCatchment) | numeral('0.0%')
            }})
          </li>
        </ul>
      </div>
    </Square>
    <Square color="light" class="flex flex-row mb-12 items-center">
      <p class="w-1/2">
        Of {{ countEnrollment | numeral('0,0') }} enrolled students
        {{ countEnrollmentBlackHispanic | numeral('0,0') }} ({{
          (countEnrollmentBlackHispanic / countEnrollment) | numeral('0.0%')
        }}) identify as either Black or Hispanic,
        {{ countEnrollmentEL | numeral('0,0') }} ({{
          (countEnrollmentEL / countEnrollment) | numeral('0.0%')
        }}) are English Learners, and
        {{ countEnrollmentSPED | numeral('0,0') }} ({{
          (countEnrollmentSPED / countEnrollment) | numeral('0.0%')
        }}) have been identified with a learning disability.
      </p>
      <unicono-gram
        class="w-1/2 bg-white"
        :values="ethnicityUniconoGramValues"
      />
    </Square>
    <Square color="dark" class="flex flex-row">
      <unicono-gram
        class="w-1/2 bg-white"
        :values="[
          {
            count: countEnrollmentEconDis,
            icon: 'person',
            color: '#3c52a1',
            label: 'Identified as Economically Disadvantaged'
          },
          {
            count: countEnrollmentCEP - countEnrollmentEconDis,
            icon: 'person',
            color: '#6dcff6',
            label: 'Approximated (based on 1.6 multiplier)'
          },
          {
            count: countEnrollment - countEnrollmentCEP,
            icon: 'person',
            color: '#888888',
            label: 'Not Economically Disadvantaged'
          }
        ]"
      />
      <p class="w-1/2">
        Of {{ countEnrollment | numeral('0,0') }} students
        {{ countEnrollmentEconDis | numeral('0,0') }} ({{
          (countEnrollmentEconDis / countEnrollment) | numeral('0.0%')
        }}) were identified as economically disadvantaged based upon guardian
        income and other factors. However, due to traditional under-reporting,
        the USDA recommends multiplying by 1.6 (1.6 ×
        {{ countEnrollmentEconDis | numeral('0,0') }}) to calculate a more
        accurate rate. This suggests that approximately
        {{ countEnrollmentCEP | numeral('0,0') }} ({{
          (countEnrollmentCEP / countEnrollment) | numeral('0.0%')
        }}) are actually economically disadvantaged.
      </p>
    </Square>
  </div>
</template>

<script>
// hypercube definitions
import ethnicityDef from '~/definitions/schoolEthnicity'
import schoolDef from '~/definitions/school'

import UniconoGram from '~sdp-components/SimpleCharts/UniconoGram'
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import Square from '~sdp-components/PageElements/Square'

const ethnicityColorMap = {
  Asian: '#3aab48',
  'Black/African American': '#3c52a1',
  'Hispanic/Latino': '#6dcff6',
  'Native Hawaiian/Pacific Islander': '#22501f',
  'Multi Racial/Other': '#888888',
  'American Indian/Alaskan Native': '#398635',
  White: '#ffaa30'
}

export default {
  components: {
    Square,
    QdtComponent,
    UniconoGram
  },
  data() {
    return {
      schoolsInitialized: this.$store.state.schools.initialized,
      slug: this.$route.params.slug,
      school: '',

      // pairs of session objects and their values
      schoolSessionObject: null,
      schoolValues: {},
      ethnicitySessionObject: null,
      ethnicityValues: {}
    }
  },
  computed: {
    // qlik objects
    map() {
      return { id: 'vxhCJS', type: 'map', height: '300px' }
    },

    // dimensions
    abbreviated() {
      return this.schoolValues.abbreviated
        ? this.schoolValues.abbreviated[0].text
        : ''
    },
    address() {
      return this.schoolValues.address ? this.schoolValues.address[0].text : ''
    },
    criteria() {
      if (this.schoolValues.admissionType) {
        const admissions = this.schoolValues.admissionType[0].text
        if (admissions === 'Special Admit') {
          return (
            this.abbreviated +
            ' is a special admissions school requiring a strong academic record.'
          )
        } else if (admissions === 'Citywide With Criteria') {
          return (
            this.abbreviated +
            ' is a city-wide school requiring a strong academic record.'
          )
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    hasCatchment() {
      return this.countCatchment > 0
    },
    network() {
      if (this.schoolValues.network) {
        const network = this.schoolValues.network[0].text
        console.log('network', network)
        if (network === 'Charters') {
          return ''
        } else if (/\d/.test(network)) {
          return 'in ' + network
        } else {
          return 'in the ' + network + ' Network'
        }
      } else {
        return ''
      }
    },
    schoolLevel() {
      return this.schoolValues.schoolLevel
        ? this.schoolValues.schoolLevel[0].text
        : ''
    },
    sector() {
      return this.schoolValues.sector ? this.schoolValues.sector[0].text : ''
    },

    zipCode() {
      return this.schoolValues.zipCode ? this.schoolValues.zipCode[0].text : ''
    },

    // metrics
    countCatchment() {
      return this.schoolValues.countCatchment
        ? this.schoolValues.countCatchment[0]?.number || 0
        : 0
    },
    countCatchmentIn() {
      return this.schoolValues.countCatchmentIn
        ? this.schoolValues.countCatchmentIn[0]?.number || 0
        : 0
    },
    countCatchmentOut() {
      return this.schoolValues.countCatchmentOut
        ? this.schoolValues.countCatchmentOut[0]?.number || 0
        : 0
    },
    countCatchmentOutCharter() {
      return this.schoolValues.countCatchmentOutCharter
        ? this.schoolValues.countCatchmentOutCharter[0]?.number || 0
        : 0
    },
    countCatchmentOutCityWide() {
      return this.schoolValues.countCatchmentOutCityWide
        ? this.schoolValues.countCatchmentOutCityWide[0]?.number || 0
        : 0
    },
    countCatchmentOutOtherNeighborhood() {
      return this.schoolValues.countCatchmentOutOtherNeighborhood
        ? this.schoolValues.countCatchmentOutOtherNeighborhood[0]?.number || 0
        : 0
    },
    countCatchmentOutOther() {
      return (
        this.countCatchmentOut -
        (this.countCatchmentOutCharter +
          this.countCatchmentOutCityWide +
          this.countCatchmentOutOtherNeighborhood)
      )
    },
    countEnrollment() {
      return this.schoolValues.countEnrollment
        ? this.schoolValues.countEnrollment[0]?.number || 0
        : 0
    },
    ethnicityUniconoGramValues() {
      if (this.ethnicityValues.ethnicity) {
        const vals = this.ethnicityValues.ethnicity.map((ethnicity, index) => ({
          count: this.ethnicityValues.countEnrollment[index]?.number || 0,
          icon: 'person',
          color: ethnicityColorMap[ethnicity.text],
          label: ethnicity.text
        }))
        return vals
      } else {
        return [{ count: 1, icon: 'person', color: 'no' }]
      }
    },
    countEnrollmentBlackHispanic() {
      if (this.ethnicityValues.ethnicity) {
        const index = this.ethnicityValues.ethnicity
          .map((v) => v.text)
          .indexOf('Black/African American')
        const index2 = this.ethnicityValues.ethnicity
          .map((v) => v.text)
          .indexOf('Hispanic/Latino')
        let count = 0
        if (index >= 0) {
          count += this.ethnicityValues.countEnrollment[index]?.number || 0
        }
        if (index2 >= 0) {
          count += this.ethnicityValues.countEnrollment[index2]?.number || 0
        }
        return count
      } else {
        return 0
      }
    },
    countEnrollmentCEP() {
      if (this.schoolValues.countEnrollmentEconDis) {
        const cep = Math.round(
          1.6 * (this.schoolValues.countEnrollmentEconDis[0]?.number || 0)
        )
        if (cep > this.countEnrollment) {
          return this.countEnrollment
        } else {
          return cep
        }
      } else {
        return 0
      }
    },
    countEnrollmentEconDis() {
      return this.schoolValues.countEnrollmentEconDis
        ? this.schoolValues.countEnrollmentEconDis[0]?.number || 0
        : 0
    },
    countEnrollmentEL() {
      return this.schoolValues.countEnrollmentEL
        ? this.schoolValues.countEnrollmentEL[0]?.number || 0
        : 0
    },
    countEnrollmentSPED() {
      return this.schoolValues.countEnrollmentSPED
        ? this.schoolValues.countEnrollmentSPED[0]?.number || 0
        : 0
    }
  },
  created() {
    if (this.schoolsInitialized) this.initialize()
  },
  methods: {
    /**
     * initialize grabs the school's slug from the route param to use as this pages school.
     * We then get the full name of the school from the slug.
     * Then select the school in the field to update the data.
     * Then get the measures from the metricValues hypercube metricValues def
     * initialized depends upon the school list being loaded, so we must only call that when schools/initialized is true in vuex
     */
    async initialize() {
      this.school = await this.$store.dispatch('schools/lookup_text_by_slug', {
        slug: this.slug,
        target: 'school'
      })

      // load hypercubes with specific demographic info
      this.ethnicitySessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        ethnicityDef
      )
      this.ethnicitySessionObject.on('changed', this.update)
      this.schoolSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        schoolDef
      )
      this.schoolSessionObject.on('changed', this.update)

      // select the current school in case we navigated here directly
      const selectedValues = {}
      selectedValues.school = await this.$qlik.selectFieldValues(
        'School Name',
        [{ text: this.school }]
      )
      this.$store.dispatch('selections/set_current_selections', selectedValues)

      this.update()
    },

    async update() {
      if (this.schoolSessionObject) {
        this.schoolValues = await this.$qlik.getValuesFromHypercubeObject(
          this.schoolSessionObject
        )
      }
      if (this.ethnicitySessionObject) {
        this.ethnicityValues = await this.$qlik.getValuesFromHypercubeObject(
          this.ethnicitySessionObject
        )
        // console.log('school/slug/update', this.ethnicityValues)
      }
    }
  }
}
</script>
<style lang="postcss" scoped>
h1 {
  font-size: 20pt;
  font-weight: bold;
}

h2 {
  font-size: 18pt;
  font-weight: bold;
}

h3 {
  font-size: 14pt;
  font-weight: bold;
}

h4 {
  font-size: 14pt;
  font-weight: 600;
}

h5 {
  font-size: 13pt;
  font-weight: 500;
}

h6 {
  font-size: 12pt;
  font-weight: 500;
}

p {
  padding: 1rem;
}

p,
li {
  text-align: left;
  font-size: 12pt;
  font-weight: 400;
}
</style>
