<template>
  <div class="container">
    <ScrollSpyNav
      class="sticky top-0 bg-white"
      title="Sections:"
      :refs="['v-trend', 'v-grade', 'v-map', 'v-table']"
      orientation="row"
      @nextorlastsectionchange="handleNextSection"
    />
    <Square color="dark">
      <div class="text-base">
        Instructions: This page shows data about students living in School
        District of Philadelphia designated neighborhood enrollment boundaries
        (catchments). If you select a school or a group of schools, the
        following charts will display information about the students who live in
        the selected catchments.
        <p v-if="!hasCatchment" class="font-semibold">
          Note: The selected school{{ oneSchoolSelected ? ' does' : 's do' }}
          not have a catchment. Some charts will not display below.
        </p>
      </div>
    </Square>
    <Square
      v-if="hasCatchment"
      ref="v-trend"
      name="Trends"
      class="flex flex-col items-center mb-4"
      color="light"
      tight
    >
      <QlikKPI
        ref="kpiCatchment"
        class="max-w-sm"
        :q-id="kpiCatchment.qId"
        :title="kpiCatchment.title"
        :subtitle="kpiCatchment.subtitle"
        :secondary-label="kpiCatchment.secondaryLabel"
        :description="kpiCatchment.description"
        :display-increase-decrease="true"
        primary-size="small"
      />
      <QdtComponent
        class="w-full m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartCatchmentTrends"
      />
    </Square>
    <Square
      v-if="hasCatchment"
      ref="v-grade"
      name="Grade/School/Network"
      color="tint"
    >
      <div class="flex flex-wrap justify-center">
        <QlikKPI
          ref="kpiEnrolledInCatchment"
          class="flex-1 mx-2"
          :q-id="kpiEnrolledInCatchment.qId"
          :title="kpiEnrolledInCatchment.title"
          :subtitle="kpiEnrolledInCatchment.subtitle"
          :secondary-label="kpiEnrolledInCatchment.secondaryLabel"
          :description="kpiEnrolledInCatchment.description"
          primary-size="small"
        />
      </div>
      <QdtComponent
        id="chart-alt-axis"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartCatchmentGrade"
      />
    </Square>
    <Square ref="v-map" name="Map" class="w-full mb-4 " color="dark">
      <Heading size="medium">
        Retention Map by School and
        {{ backgroundAreaTypeMap[backgroundType] }}
      </Heading>
      <Square v-if="!oneSchoolSelected" color="tint" class="mt-2">
        <div class="w-full flex justify-start">
          <ButtonGroup
            :options="backgroundAreaTypeMap"
            :selected-value="backgroundType"
            label="Background area"
            @buttonClicked="
              handleBackgroundSelection($event.value, $event.label)
            "
          />
        </div>
        <div class="w-full flex justify-start">
          <ButtonGroup
            :options="{
              0: 'No',
              1: 'Yes'
            }"
            :selected-value="showNonCatchment"
            label="Show non-catchment schools"
            @buttonClicked="
              handleNonCatchmentSelection($event.value, $event.label)
            "
          />
        </div>
      </Square>
      <QdtComponent class="w-full" :load="loadMap" type="QdtViz" :props="map">
        <Square tight color="white">
          <div v-if="oneSchoolSelected">
            <p class="text-left px-4 py-1">
              <span>
                Use this map to determine where students enrolled at
                {{ selectedSchoolPublicationName }} live.
              </span>
              <span v-if="hasCatchment">
                Additionally, use this map to determine where students who live
                in the {{ selectedSchoolPublicationName }} catchment enroll.
              </span>
            </p>
            <div
              v-if="hasCatchment"
              class="flex flex-wrap px-4 py-1 items-center"
            >
              <div class="h-full mr-2">
                School color key:
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #0b315b"
              >
                ⬤ In-Catchment
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: black; background-color: #47aad8"
              >
                ⬤ City-Wide
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #398635"
              >
                ⬤ Other Catchment
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: black; background-color: #ffaa30"
              >
                ▲ Other
              </div>
              <div
                class="mx-1 px-2 my-1"
                style="color: white; background-color: #ae1c3e"
              >
                ⬜ Charter
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-left px-4 py-1">
              Use this map to determine the percentage of students living in a
              catchment attend their designated catchment school.
              <span v-if="parseInt(showNonCatchment) === 1">
                Schools without catchments are displayed in gray (◯ district, ⬜
                charter).
              </span>
              Select a single school for more details about students enrolled or
              designated for that school.
            </p>
          </div>
        </Square>
      </QdtComponent>
    </Square>
    <Square ref="v-table" name="Table" class="w-full mb-4" color="tint" tight>
      <Heading size="medium">
        Catchment Details by School
      </Heading>
      <QdtComponent
        class="w-full mt-2"
        :load="loadTable"
        type="QdtViz"
        :props="table"
      />
    </Square>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'
import Heading from '~sdp-components/PageElements/Heading'
import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'
import ScrollSpyNav from '~sdp-components/Navigation/ScrollSpyNav'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square,
    Heading,
    ButtonGroup,
    ScrollSpyNav
  },
  data() {
    return {
      backgroundType: 'ZipCode_Retention',
      showNonCatchment: 0,
      loadMap: false,
      loadTable: false
    }
  },
  computed: {
    ...mapGetters({
      anySelections: 'selections/anySelections',
      oneSchoolSelected: 'selections/oneSchoolSelected',
      selectedSchool: 'selections/selectedSchool',
      selectedSchoolPublicationName: 'selections/selectedSchoolPublicationName',
      hasCatchment: 'selections/hasCatchment'
    }),
    backgroundAreaTypeMap() {
      return {
        ZipCode_Retention: 'Zip Code',
        HS_Retention: 'High School Area',
        MS_Retention: 'Middle School Area',
        ES_Retention: 'Elementary School Area'
      }
    },
    // qlik objects
    chartCatchmentGrade() {
      return {
        id: 'gwjbgj',
        type: 'barchart',
        height: '300px'
      }
    },
    chartCatchmentTrends() {
      return {
        id: 'AxGg',
        type: 'linechart',
        height: '300px'
      }
    },
    kpiCatchment() {
      return {
        qId: 'CwQe',
        description: ` `,
        title: this.anySelections
          ? this.oneSchoolSelected
            ? 'Students Living in ' +
              this.selectedSchoolPublicationName +
              ' Catchment'
            : 'Students Living in Selected Catchments'
          : 'Total Students',
        subtitle: ' ',
        secondaryLabel: `From ${this.$store.getters.sy_p}`,
        color: 'light'
      }
    },
    kpiEnrolledInCatchment() {
      return {
        qId: 'thmrb',
        description: `
          Students attending their designated catchment school.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: '% Enrolled',
        color: 'white'
      }
    },
    kpiEnrolledInCharter() {
      return {
        qId: 'bTxdgaP',
        description: `
          Students attending a charter school.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: '% Enrolled'
      }
    },
    map() {
      // note this is in a tab container, make sure to find the tindex as qid in dev tools
      return {
        id: 'cvNpvYm',
        type: 'map',
        height: '600px'
      }
    },
    table() {
      return {
        id: 'vbWqJP',
        type: 'table',
        height: '600px'
      }
    }
  },
  async mounted() {
    this.backgroundType = await this.$qlik.getVariableValueByName(
      'vSelector_MapBackground_Catchment'
    )
    this.showNonCatchment = await this.$qlik.getVariableValueByName(
      'vSelector_ShowNonCatchments'
    )
  },
  methods: {
    handleBackgroundSelection(backgroundType, backgroundLabel) {
      this.$qlik.setVariableValueByName(
        'vSelector_MapBackground_Catchment',
        backgroundType
      )
      this.backgroundType = backgroundType
    },
    handleNonCatchmentSelection(showNonCatchment, showNonCatchmentLabel) {
      this.$qlik.setVariableValueByName(
        'vSelector_ShowNonCatchments',
        showNonCatchment
      )
      this.showNonCatchment = showNonCatchment
    },
    handleNextSection(value) {
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
