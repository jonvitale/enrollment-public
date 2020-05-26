<template>
  <div class="container">
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        ref="kpi1"
        class="max-w-sm"
        :q-id="kpi1.props.qId"
        :title="kpi1.props.title"
        :subtitle="kpi1.props.subtitle"
        :secondary-label="kpi1.props.secondaryLabel"
        :description="kpi1.props.description"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        :type="chart1.type"
        :props="chart1.props"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="light" tight>
      <QlikKPI
        class="max-w-sm"
        :q-id="kpi2.props.qId"
        :title="kpi2.props.title"
        :subtitle="kpi2.props.subtitle"
        :secondary-label="kpi2.props.secondaryLabel"
        :description="kpi2.props.description"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        :type="chart2.type"
        :props="chart2.props"
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
        :q-id="kpi3.props.qId"
        :title="kpi3.props.title"
        :subtitle="kpi3.props.subtitle"
        :secondary-label="kpi3.props.secondaryLabel"
        :description="kpi3.props.description"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        :type="chart3.type"
        :props="chart3.props"
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
        type: 'kpi',
        props: {
          qId: 'BwyQfy',
          description: `
            Student count for all District, Charter, Alternative, and Cyber Charter Schools.
            `,
          title: '',
          subtitle: ' ',
          secondaryLabel: 'From  ' + this.$store.state.SY_P,
          color: 'light'
        }
      },
      chart1: {
        type: 'QdtViz',
        props: { id: 'DSXzNU', type: 'comboLineBarchart', height: '300px' }
      },
      kpi2: {
        type: 'kpi',
        props: {
          qId: 'zxJhdS',
          description: `
            Percent of student identified as economically disadvantaged, 
            multiplied by a USDA-defined factor of 1.6, and capped at 100%.
            `,
          title: '',
          subtitle: ' ',
          secondaryLabel: 'From  ' + this.$store.state.SY_P,
          color: 'light'
        }
      },
      chart2: {
        type: 'QdtViz',
        props: { id: 'JAruxT', type: 'comboLineBarchart', height: '300px' }
      },
      kpi3: {
        type: 'kpi',
        props: {
          qId: 'kjdBpB',
          description: `
            The percent of students attending their neighborhood school, out of all students
            living in the catchment.
            `,
          title: '',
          subtitle: ' ',
          secondaryLabel: 'From  ' + this.$store.state.SY_P,
          color: 'light'
        }
      },
      chart3: {
        type: 'QdtViz',
        props: { id: 'mNybWN', type: 'comboLineBarchart', height: '300px' }
      }
    }
  }
}
</script>
