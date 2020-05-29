<template>
  <div class="container">
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi_enrollment"
        class="max-w-sm"
        :q-id="kpi_enrollment.qId"
        :title="kpi_enrollment.title"
        :subtitle="kpi_enrollment.subtitle"
        :secondary-label="kpi_enrollment.secondaryLabel"
        :description="kpi_enrollment.description"
        value-size="small"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_enrollment_trends"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_enrollment_change"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart_enrollment_yoy"
      />
    </Square>
  </div>
</template>
<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'
// import ButtonGroup from '~sdp-components/PageElements/ButtonGroup'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square
    // ,
    // ButtonGroup
  },
  data() {
    return {
      kpi_enrollment: {
        qId: 'BwyQfy',
        description: ` `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart_enrollment_trends: {
        id: 'MeuSjXD',
        type: 'linechart',
        height: '300px'
      },
      chart_enrollment_change: {
        id: 'WrRDe',
        type: 'barchart',
        height: '300px'
      },
      chart_enrollment_yoy: {
        id: 'psxUYL',
        type: 'combochart',
        height: '300px'
      }
    }
  }
}
</script>
