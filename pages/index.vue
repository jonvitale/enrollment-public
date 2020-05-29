<template>
  <div class="container">
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi1"
        class="max-w-sm"
        :q-id="kpi1.qId"
        :title="kpi1.title"
        :subtitle="kpi1.subtitle"
        :secondary-label="kpi1.secondaryLabel"
        :description="kpi1.description"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart1"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        class="max-w-sm"
        :q-id="kpi2.qId"
        :title="kpi2.title"
        :subtitle="kpi2.subtitle"
        :secondary-label="kpi2.secondaryLabel"
        :description="kpi2.description"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart2"
      />
    </Square>
    <Square
      v-if="!$store.getters['selections/oneSchoolSelected']"
      class="flex flex-wrap mb-4"
      color="light"
      tight
    >
      <QlikKPI
        class="max-w-sm"
        :q-id="kpi3.qId"
        :title="kpi3.title"
        :subtitle="kpi3.subtitle"
        :secondary-label="kpi3.secondaryLabel"
        :description="kpi3.description"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chart3"
      />
    </Square>
  </div>
</template>

<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square
  },
  data() {
    return {
      kpi1: {
        qId: 'BwyQfy',
        description: `
          Student count for all District, Charter, Alternative, and Cyber Charter Schools.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart1: {
        id: 'DSXzNU',
        type: 'linechart',
        height: '300px'
      },
      kpi2: {
        qId: 'zxJhdS',
        description: `
          Percent of student identified as economically disadvantaged, 
          multiplied by a USDA-defined factor of 1.6, and capped at 100%.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart2: {
        id: 'JAruxT',
        type: 'barchart',
        height: '300px'
      },
      kpi3: {
        qId: 'kjdBpB',
        description: `
          The percent of students attending their neighborhood school, out of all students
          living in the catchment.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.state.SY_P,
        color: 'light'
      },
      chart3: {
        id: 'mNybWN',
        type: 'barchart',
        height: '300px'
      }
    }
  }
}
</script>
