<template>
  <div class="container">
    <ScrollSpyNav
      class="sticky top-0 bg-white"
      title="Sections:"
      :refs="['v-demo', 'v-catchment', 'v-grade']"
      orientation="row"
    />
    <Square
      ref="v-demo"
      name="Demographics"
      class="flex flex-col items-center mb-4"
      color="light"
      tight
    >
      <QlikKPI
        ref="kpiEnrollment"
        class="max-w-sm"
        :q-id="kpiEnrollment.qId"
        :title="kpiEnrollment.title"
        :subtitle="kpiEnrollment.subtitle"
        :secondary-label="kpiEnrollment.secondaryLabel"
        :description="kpiEnrollment.description"
        :display-increase-decrease="true"
        primary-size="reactive"
      />
      <QdtComponent
        class="w-full m-2 p-2 bg-white hideschoolyearbutton"
        type="QdtViz"
        :props="chartEnrolledDemographics"
      />
    </Square>
    <Square
      ref="v-catchment"
      name="In/Out-Catchment"
      class="flex flex-wrap mb-4"
      color="tint"
      tight
    >
      <QdtComponent
        id="chart-alt-axis"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrolledInCatchmentTrends"
      />
    </Square>
    <Square
      ref="v-grade"
      name="Grade/School/Network"
      class="flex flex-col mb-4"
      color="medium"
      tight
    >
      <QdtComponent
        id="chart-alt-axis"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentChange"
      />
      <QdtComponent
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentYOY"
      />
    </Square>
  </div>
</template>
<script>
import QdtComponent from '~sdp-components/Qdt/QdtComponent'
import QlikKPI from '~sdp-components/Qlik/QlikKPI'
import Square from '~sdp-components/PageElements/Square'
import ScrollSpyNav from '~sdp-components/Navigation/ScrollSpyNav'

export default {
  layout: 'main',
  components: {
    QdtComponent,
    QlikKPI,
    Square,
    ScrollSpyNav
  },
  computed: {
    chartEnrolledDemographics() {
      return {
        id: 'rmanYD',
        type: 'linechart',
        height: '300px'
      }
    },
    chartEnrolledInCatchmentTrends() {
      return {
        id: 'MeuSjXD',
        type: 'linechart',
        height: '300px'
      }
    },
    chartEnrollmentChange() {
      return {
        id: '3e4ac306-4546-4e43-9a0a-6f29b12a0f17',
        type: 'barchart',
        height: '500px'
      }
    },
    chartEnrollmentYOY() {
      return {
        id: '5365654e-e49f-431a-b7ff-ba9ddb91fb23',
        type: 'combochart',
        height: '300px'
      }
    },
    kpiEnrollment() {
      return {
        qId: 'BwyQfy',
        description: `
          Student count for all District, Charter, Alternative, and Cyber Charter Schools.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    }
  }
}
</script>
<style lang="postcss">
.hideschoolyearbutton button[title='School Year'] {
  display: none !important;
  /* the following isn't working because the span is on the parent's sibling */
  ~ span {
    display: none !important;
  }
}
</style>
