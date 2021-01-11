<template>
  <div class="container">
    <ScrollSpyNav
      class="sticky top-0 bg-white"
      title="Sections:"
      :refs="['v-ethnicity', 'v-econdis', 'v-el', 'v-sped', 'v-map', 'v-table']"
      orientation="row"
      @nextorlastsectionchange="handleNextSection"
    />
    <Square
      ref="v-ethnicity"
      :name="demoTypeMap[demoType]"
      class="w-full mb-4"
      color="tint"
      tight
    >
      <Heading size="medium">
        % of Students by {{ demoTypeMap[demoType] }}
      </Heading>
      <div class="py-2 w-full flex flex-row justify-between">
        <ButtonGroup
          :options="demoTypeMap"
          :selected-value="demoType"
          vertical
          class="mx-2"
          style="min-width:10rem"
          @buttonClicked="handleDemoTypeSelection($event.value, $event.label)"
        />
        <QdtComponent
          id="chart-alt-axis"
          class="flex-auto m-2 p-2 bg-white"
          type="QdtViz"
          :props="chartEnrollmentDemographics"
        />
      </div>
      <content-button
        :selected="showPictogram"
        @click="showPictogram = !showPictogram"
      >
        {{ showPictogram ? 'Hide Pictogram' : 'Show Pictogram' }}
      </content-button>
      <unicono-gram
        v-if="showPictogram"
        class="bg-white"
        :values="uniconoGramValuesDemo"
        :max-count-row="20"
        :continuous="false"
      />
    </Square>
    <Square
      ref="v-econdis"
      name="Economically Disadvantaged"
      class="flex flex-wrap mb-4"
      color="light"
      tight
    >
      <QlikKPI
        ref="kpiEnrollmentEconDis"
        class="max-w-sm"
        :q-id="kpiEnrollmentEconDis.qId"
        :title="kpiEnrollmentEconDis.title"
        :subtitle="kpiEnrollmentEconDis.subtitle"
        :secondary-label="kpiEnrollmentEconDis.secondaryLabel"
        :description="kpiEnrollmentEconDis.description"
        :display-increase-decrease="true"
        primary-size="small"
      />
      <unicono-gram
        class="max-w-sm bg-white"
        :max-count-row="10"
        :values="uniconoGramValuesEconDis"
      />
    </Square>

    <Square
      ref="v-el"
      name="English Learners"
      class="flex flex-wrap mb-4"
      color="medium"
      tight
    >
      <QlikKPI
        ref="kpiEnrollmentEL"
        color="medium"
        class="max-w-sm"
        :q-id="kpiEnrollmentEL.qId"
        :title="kpiEnrollmentEL.title"
        :subtitle="kpiEnrollmentEL.subtitle"
        :secondary-label="kpiEnrollmentEL.secondaryLabel"
        :description="kpiEnrollmentEL.description"
        :display-increase-decrease="true"
        primary-size="small"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentEL"
      />
    </Square>
    <Square
      ref="v-sped"
      name="Special Ed"
      class="flex flex-col items-center mb-4"
      color="tint"
      tight
    >
      <QlikKPI
        ref="kpiEnrollmentSPED"
        class="max-w-sm"
        :q-id="kpiEnrollmentSPED.qId"
        :title="kpiEnrollmentSPED.title"
        :subtitle="kpiEnrollmentSPED.subtitle"
        :secondary-label="kpiEnrollmentSPED.secondaryLabel"
        :description="kpiEnrollmentSPED.description"
        :display-increase-decrease="true"
        primary-size="small"
      />
      <QdtComponent
        class="w-full m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentSPED"
      />
    </Square>
    <Square ref="v-map" name="Map" class="w-full mb-4 " color="dark">
      <Heading size="medium">
        Map {{ backgroundMetricTypeMap[metricType] }} by School and
        {{ backgroundAreaTypeMap[areaType] }}
      </Heading>
      <Square color="tint" class="mt-2">
        <div class="w-full flex flex-row justify-center">
          <ButtonGroup
            :options="backgroundMetricTypeMap"
            :selected-value="metricType"
            label="Metric"
            @buttonClicked="
              handleBackgroundMetricSelection($event.value, $event.label)
            "
          />
        </div>
        <div class="w-full flex flex-row justify-center">
          <ButtonGroup
            :options="backgroundAreaTypeMap"
            :selected-value="areaType"
            label="Background area"
            @buttonClicked="
              handleBackgroundSelection($event.value, $event.label)
            "
          />
        </div>
      </Square>
      <QdtComponent class="w-full" type="QdtViz" :props="map" :load="loadMap">
        <Square tight color="white">
          <div class="flex flex-wrap px-4 py-1 items-center">
            <div v-if="metricType === 'Ethnicity'" class="flex flex-wrap my-1">
              <div class="h-full mr-2">
                School color key (by {{ metricType }}):
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #3c52a1"
              >
                Black/African American
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: black; background-color: #6dcff6"
              >
                Hispanic/Latino
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #3aab48"
              >
                Asian
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: black; background-color: #ffaa30"
              >
                White
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #888888"
              >
                Multi Racial/Other
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #22501f"
              >
                Native Hawaiian/Pacific Islander
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #398635"
              >
                American Indian/Alaskan Native
              </div>
            </div>
            <div v-else class="flex flex-wrap items-center">
              <div class="h-full mr-2">
                School color key (by {{ metricType }}):
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #3b72b9"
              >
                Yes
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #ffaa30"
              >
                No
              </div>
            </div>
          </div>
        </Square>
      </QdtComponent>
    </Square>
    <Square ref="v-table" name="Table" class="w-full mb-4" color="tint" tight>
      <Heading size="medium">
        Demographics Details by {{ tableTypeMap[tableType] }}
      </Heading>
      <div class="w-full mt-2 flex flex-row justify-center">
        <ButtonGroup
          :options="tableTypeMap"
          label=""
          @buttonClicked="handleTableSelection($event.value, $event.label)"
        />
      </div>
      <QdtComponent
        class="w-full"
        :load="loadTable"
        type="QdtViz"
        :props="table"
      />
    </Square>
  </div>
</template>
<script>
import UniconoGram from '~sdp-components/SimpleCharts/UniconoGram'
import ContentButton from '~sdp-components/PageElements/ContentButton'
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'
import Heading from '~sdp-components/PageElements/Heading'
import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'
import ScrollSpyNav from '~sdp-components/Navigation/ScrollSpyNav'

import demographicsDef from '~/definitions/demographics'
import ethnicityDef from '~/definitions/ethnicity'
import ageDef from '~/definitions/age'
import genderDef from '~/definitions/gender'
import gradeDef from '~/definitions/grade'

const ethnicityColorMap = {
  Asian: '#3aab48',
  'Black/African American': '#3c52a1',
  'Hispanic/Latino': '#6dcff6',
  'Native Hawaiian/Pacific Islander': '#22501f',
  'Multi Racial/Other': '#888888',
  'American Indian/Alaskan Native': '#398635',
  White: '#ffaa30'
}

const genderColorMap = {
  Male: '#47aad8',
  Female: '#ffaa30'
}

export default {
  layout: 'main',
  components: {
    QdtComponent,
    ContentButton,
    QlikKPI,
    Square,
    Heading,
    ButtonGroup,
    ScrollSpyNav,
    UniconoGram
  },
  data() {
    return {
      schoolsInitialized: this.$store.state.schools.initialized,
      demoType: 'ethnicity',
      areaType: 'ZipCode',
      metricType: 'Ethnicity',
      tableType: 'School',
      showPictogram: false,
      // pairs of session objects and their values
      demographicsSessionObject: null,
      demographicsValues: {},
      ethnicitySessionObject: null,
      ethnicityValues: {},
      genderSessionObject: null,
      genderValues: {},
      ageSessionObject: null,
      ageValues: {},
      gradeSessionObject: null,
      gradeValues: {},

      // do not load map/table until scrolled
      loadMap: false,
      loadTable: false
    }
  },
  computed: {
    demoTypeMap() {
      return {
        ethnicity: 'Race/Ethnicity',
        gender: 'Gender',
        grade: 'Grade',
        age: 'Age'
      }
    },
    backgroundAreaTypeMap() {
      return {
        ZipCode: 'Zip Code',
        HS: 'High School Area',
        MS: 'Middle School Area',
        ES: 'Elementary School Area'
      }
    },
    backgroundMetricTypeMap() {
      return {
        Ethnicity: 'Ethnicity',
        EL: 'English Learners',
        'Economically Disadvantaged': 'Economically Disadvantaged',
        SPED: 'Special Education'
      }
    },
    tableTypeMap() {
      const tmap = { School: 'School' }
      tmap[this.areaType] = this.backgroundAreaTypeMap[this.areaType]
      return tmap
    },
    chartEnrollmentDemographics() {
      if (this.demoType === 'ethnicity') {
        return {
          id: 'f823a659-1865-4769-950d-b6431b2af57a',
          type: 'barchart',
          height: '300px'
        }
      } else if (this.demoType === 'gender') {
        return {
          id: 'jZjkrpy',
          type: 'barchart',
          height: '300px'
        }
      } else if (this.demoType === 'age') {
        return {
          id: 'CyUxyD',
          type: 'barchart',
          height: '300px'
        }
      } else if (this.demoType === 'grade') {
        return {
          id: 'WaQBFa',
          type: 'barchart',
          height: '300px'
        }
      } else {
        return null
      }
    },
    chartEnrollmentEL() {
      return {
        id: 'wSwQ',
        type: 'treemap',
        height: '300px'
      }
    },
    chartEnrollmentSPED() {
      return {
        id: 'gjss',
        type: 'treemap',
        height: '300px'
      }
    },
    kpiEnrollmentEconDis() {
      return {
        qId: 'zxJhdS',
        description: `
          The percentage of students identified as economically disadvantaged, 
          multiplied by a USDA-defined factor of 1.6, and capped at 100%. 
          Does not include charter school students.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    },
    kpiEnrollmentEL() {
      return {
        qId: 'rfNPaKa',
        description: `The percentage of students identified as English Learners based upon performance on the ACCESS exam.`,
        title: 'English Learners',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    },
    kpiEnrollmentSPED() {
      return {
        qId: 'fqFM',
        description: `The percentage of students with an Individualized Education Program (for a disibility other than "mentally gifted").`,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    },
    map() {
      return {
        id: 'e56b219d-9cf7-46ab-b881-ffd844aa8251',
        type: 'map',
        height: '600px'
      }
    },
    table() {
      if (this.tableType === 'School') {
        return {
          id: 'mmsJUW',
          type: 'table',
          height: '600px'
        }
      } else {
        return {
          id: 'UTPyp',
          type: 'table',
          height: '600px'
        }
      }
    },

    /// calculated values for text and unicono-gram
    countEnrollment() {
      return this.demographicsValues.countEnrollment
        ? this.demographicsValues.countEnrollment[0]?.number || 0
        : 0
    },
    countEnrollmentNoCharter() {
      return this.demographicsValues.countEnrollmentNoCharter
        ? this.demographicsValues.countEnrollmentNoCharter[0]?.number || 0
        : 0
    },
    countEnrollmentCEP() {
      if (this.demographicsValues.countEnrollmentEconDis) {
        const cep = Math.round(
          1.6 * (this.demographicsValues.countEnrollmentEconDis[0]?.number || 0)
        )
        return cep > this.countEnrollmentNoCharter
          ? this.countEnrollmentNoCharter
          : cep
      } else {
        return 0
      }
    },
    countEnrollmentEconDis() {
      return this.demographicsValues.countEnrollmentEconDis
        ? this.demographicsValues.countEnrollmentEconDis[0]?.number || 0
        : 0
    },

    uniconoGramValuesEconDis() {
      return [
        {
          count: this.countEnrollmentEconDis,
          icon: 'person',
          color: '#3c52a1',
          label: 'Identified as economically disadvantaged'
        },
        {
          count: this.countEnrollmentCEP - this.countEnrollmentEconDis,
          icon: 'person',
          color: '#6dcff6',
          label:
            'Estimated as economically disadvantaged (based on 1.6 multiplier)'
        },
        {
          count: this.countEnrollmentNoCharter - this.countEnrollmentCEP,
          icon: 'person',
          color: '#888888',
          label: 'Not economically disadvantaged'
        }
      ]
    },

    uniconoGramValuesDemo() {
      if (this.demoType === 'ethnicity') {
        return this.ethnicityValues.ethnicity.map(({ text: label }, index) => ({
          count: this.ethnicityValues.countEnrollment[index]?.number || 0,
          icon: 'person',
          color: ethnicityColorMap[label],
          label
        }))
      } else if (this.demoType === 'gender') {
        return this.genderValues.gender.map(({ text: label }, index) => ({
          count: this.genderValues.countEnrollment[index]?.number || 0,
          icon: 'person',
          color: genderColorMap[label],
          label
        }))
      } else if (this.demoType === 'grade') {
        return this.gradeValues.grade.map(({ text: label }, index) => ({
          count: this.gradeValues.countEnrollment[index]?.number || 0,
          icon: 'person',
          color: '#3c52a1',
          label
        }))
      } else if (this.demoType === 'age') {
        return this.ageValues.age.map(({ text: label }, index) => ({
          count: this.ageValues.countEnrollment[index]?.number || 0,
          icon: 'person',
          color: '#3c52a1',
          label
        }))
      } else {
        return []
      }
    }
  },
  created() {
    if (this.schoolsInitialized) this.initialize()
  },
  async mounted() {
    this.areaType = await this.$qlik.getVariableValueByName(
      'vSelector_MapBackground_Demos'
    )
    this.metricType = await this.$qlik.getVariableValueByName(
      'vSelector_MapMetric_Demos'
    )
  },
  beforeDestroy() {
    try {
      this.$qlik.destroySessionObject(this.demographicsSessionObject)
      this.$qlik.destroySessionObject(this.ethnicitySessionObject)
      this.$qlik.destroySessionObject(this.genderSessionObject)
      this.$qlik.destroySessionObject(this.gradeSessionObject)
      this.$qlik.destroySessionObject(this.ageSessionObject)
    } catch (error) {
      console.log('error destroying session object in demographics', error)
    }
  },
  methods: {
    async initialize() {
      this.demographicsSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        demographicsDef
      )
      this.demographicsSessionObject.on('changed', this.update)
      this.ethnicitySessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        ethnicityDef
      )
      this.ethnicitySessionObject.on('changed', this.update)
      this.genderSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        genderDef
      )
      this.genderSessionObject.on('changed', this.update)
      this.gradeSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        gradeDef
      )
      this.gradeSessionObject.on('changed', this.update)
      this.ageSessionObject = await this.$qlik.generateHypercubeObjectFromDef(
        ageDef
      )
      this.ageSessionObject.on('changed', this.update)
      this.update()
    },
    async update() {
      if (this.demographicsSessionObject) {
        this.demographicsValues = await this.$qlik.getValuesFromHypercubeObject(
          this.demographicsSessionObject
        )
      }
      if (this.ethnicitySessionObject) {
        this.ethnicityValues = await this.$qlik.getValuesFromHypercubeObject(
          this.ethnicitySessionObject
        )
      }
      if (this.genderSessionObject) {
        this.genderValues = await this.$qlik.getValuesFromHypercubeObject(
          this.genderSessionObject
        )
      }
      if (this.gradeSessionObject) {
        this.gradeValues = await this.$qlik.getValuesFromHypercubeObject(
          this.gradeSessionObject
        )
      }
      if (this.ageSessionObject) {
        this.ageValues = await this.$qlik.getValuesFromHypercubeObject(
          this.ageSessionObject
        )
      }
    },
    handleDemoTypeSelection(value, label) {
      this.demoType = value
    },
    handleBackgroundSelection(areaType, areaLabel) {
      this.$qlik.setVariableValueByName(
        'vSelector_MapBackground_Demos',
        areaType
      )
      this.areaType = areaType
    },
    handleBackgroundMetricSelection(metricType, metricLabel) {
      this.$qlik.setVariableValueByName('vSelector_MapMetric_Demos', metricType)
      this.metricType = metricType
    },
    handleTableSelection(value, label) {
      this.tableType = value
    },
    handleNextSection(value) {
      // console.log('handleNextSection', value)
      if (value === 'v-map') {
        this.loadMap = true
      } else if (value === 'v-table') {
        this.loadMap = true
        this.loadTable = true
      }
    }
  }
}
</script>
