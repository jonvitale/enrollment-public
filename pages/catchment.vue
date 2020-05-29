<template>
  <div class="container">
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi_catchment"
        class="max-w-sm"
        :q-id="kpi_catchment.qId"
        :title="kpi_catchment.title"
        :subtitle="kpi_catchment.subtitle"
        :secondary-label="kpi_catchment.secondaryLabel"
        :description="kpi_catchment.description"
        value-size="small"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_catchment_trends"
      />
    </Square>
    <Square color="tint">
      <div class="flex flex-wrap">
        <QlikKPI
          ref="kpi_enrolledincatchment"
          class="flex-1 mx-2"
          :q-id="kpi_enrolledincatchment.qId"
          :title="kpi_enrolledincatchment.title"
          :subtitle="kpi_enrolledincatchment.subtitle"
          :secondary-label="kpi_enrolledincatchment.secondaryLabel"
          :description="kpi_enrolledincatchment.description"
          value-size="small"
        />
        <QlikKPI
          ref="kpi_enrolledincharter"
          class="flex-1 mx-2"
          :q-id="kpi_enrolledincharter.qId"
          :title="kpi_enrolledincharter.title"
          :subtitle="kpi_enrolledincharter.subtitle"
          :secondary-label="kpi_enrolledincharter.secondaryLabel"
          :description="kpi_enrolledincharter.description"
          value-size="small"
        />
      </div>
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_catchment_grade"
      />
    </Square>
    <Square ref="v-map" name="Map" class="w-full mb-4 " color="dark">
      <QdtComponent class="w-full" type="QdtViz" :props="map" />
      <Square color="tint">
        <div class="w-full flex flex-row justify-center">
          <ButtonGroup
            :options="{
              HS_Retention: 'High School Area',
              MS_Retention: 'Middle School Area',
              ES_Retention: 'Elementary School Area',
              ZipCode_Retention: 'Zip Code'
            }"
            label="Show Background Color By Retention in"
            @buttonClicked="handleBackgroundSelection($event.id, $event.value)"
          />
        </div>
      </Square>
    </Square>
    <Square ref="v-table" name="Table" class="w-full mb-4" color="tint" tight>
      <QdtComponent class="w-full" type="QdtViz" :props="table" />
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
      kpi_catchment: {
        qId: 'CwQe',
        description: ` `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart_catchment_trends: {
        id: 'AxGg',
        type: 'linechart',
        height: '300px'
      },
      kpi_enrolledincatchment: {
        qId: 'thmrb',
        description: `
          Student attending their assigned catchment (neighborhood) school.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'white'
      },
      kpi_enrolledincharter: {
        qId: 'bTxdgaP',
        description: `
          Student attending a charter school.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P
      },
      chart_catchment_grade: {
        id: 'gwjbgj',
        type: 'barchart',
        height: '300px'
      },
      map: {
        id: 'vxhCJS',
        type: 'map',
        height: '600px'
      },
      table: {
        id: 'vbWqJP',
        type: 'table',
        height: '600px'
      }
    }
  },
  methods: {
    handleBackgroundSelection(backgroundId, backgroundName) {
      this.$qlik.setVariableValueByName(
        'vSelector_MapBackground_Catchment',
        backgroundId
      )
    }
  }
}
</script>
