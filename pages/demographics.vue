<template>
  <div class="container">
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi_econdisadvantaged"
        class="max-w-sm"
        :q-id="kpi_econdisadvantaged.qId"
        :title="kpi_econdisadvantaged.title"
        :subtitle="kpi_econdisadvantaged.subtitle"
        :secondary-label="kpi_econdisadvantaged.secondaryLabel"
        :description="kpi_econdisadvantaged.description"
        value-size="small"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_demographics"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi_el"
        class="max-w-sm"
        :q-id="kpi_el.qId"
        :title="kpi_el.title"
        :subtitle="kpi_el.subtitle"
        :secondary-label="kpi_el.secondaryLabel"
        :description="kpi_el.description"
        value-size="small"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_el"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi_sped"
        class="max-w-sm"
        :q-id="kpi_sped.qId"
        :title="kpi_sped.title"
        :subtitle="kpi_sped.subtitle"
        :secondary-label="kpi_sped.secondaryLabel"
        :description="kpi_sped.description"
        value-size="small"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_sped"
      />
    </Square>
    <Square ref="v-map" name="Map" class="w-full mb-4 " color="dark">
      <QdtComponent class="w-full" type="QdtViz" :props="map" />
      <Square color="tint">
        <div class="w-full flex flex-row justify-center">
          <ButtonGroup
            :options="{
              ZipCode: 'Zip Code',
              HS: 'High School Area',
              MS: 'Middle School Area',
              ES: 'Elementary School Area'
            }"
            label="Show Background Color By"
            @buttonClicked="handleBackgroundSelection($event.id, $event.value)"
          />
        </div>
        <div class="w-full flex flex-row justify-center">
          <ButtonGroup
            :options="{
              Ethnicity: '% Black or Hispanic',
              EL: '% English Learners',
              'Economically Disadvantaged': '% Economically Disadvantaged',
              SPED: '% Special Education'
            }"
            label="Color Background Color By"
            @buttonClicked="
              handleBackgroundMetricSelection($event.id, $event.value)
            "
          />
        </div>
      </Square>
    </Square>
    <Square ref="v-table" name="Table" class="w-full mb-4" color="tint" tight>
      <div class="w-full flex flex-row justify-center">
        <ButtonGroup
          :options="{
            school: 'School',
            area: areaType
          }"
          label="View Table By"
          @buttonClicked="handleTableSelection($event.id, $event.value)"
        />
      </div>
      <QdtComponent
        v-if="tableType == 'school'"
        class="w-full"
        type="QdtViz"
        :props="table_school"
      />
      <QdtComponent v-else class="w-full" type="QdtViz" :props="table_area" />
    </Square>
  </div>
</template>
<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'
import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square,
    ButtonGroup
  },
  data() {
    return {
      areaType: 'Zip Code',
      tableType: 'school',
      // qlik objects
      kpi_econdisadvantaged: {
        qId: 'PUJFJx',
        description: ` `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From' + this.$store.state.SY_P,
        color: 'light'
      },
      chart_demographics: {
        id: 'QRMPY',
        type: 'barchart',
        height: '300px'
      },
      kpi_el: {
        qId: 'rfNPaKa',
        description: ` `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart_el: {
        id: 'wSwQ',
        type: 'treemap',
        height: '300px'
      },
      kpi_sped: {
        qId: 'fqFM',
        description: ` `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart_sped: {
        id: 'gjss',
        type: 'treemap',
        height: '300px'
      },
      map: {
        id: 'e56b219d-9cf7-46ab-b881-ffd844aa8251',
        type: 'map',
        height: '600px'
      },
      table_school: {
        id: 'mmsJUW',
        type: 'table',
        height: '600px'
      },
      table_area: {
        id: 'UTPyp',
        type: 'table',
        height: '600px'
      }
    }
  },
  methods: {
    handleBackgroundSelection(backgroundId, backgroundName) {
      this.$qlik.setVariableValueByName(
        'vSelector_MapBackground_Demos',
        backgroundId
      )
      this.areaType = backgroundName
    },
    handleBackgroundMetricSelection(backgroundId, backgroundName) {
      this.$qlik.setVariableValueByName(
        'vSelector_MapMetric_Demos',
        backgroundId
      )
    },
    handleTableSelection(id, name) {
      this.tableType = id
    }
  }
}
</script>
