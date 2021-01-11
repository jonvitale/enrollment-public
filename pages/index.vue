<template>
  <div class="container">
    <Square class="flex flex-wrap lg:flex-no-wrap mb-4" color="light" tight>
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
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentTrend"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="tint" tight>
      <QlikKPI
        class="max-w-sm"
        :q-id="kpiEnrollmentEL.qId"
        :title="kpiEnrollmentEL.title"
        :subtitle="kpiEnrollmentEL.subtitle"
        :secondary-label="kpiEnrollmentEL.secondaryLabel"
        :description="kpiEnrollmentEL.description"
        :primary-null-message="kpiEnrollmentEL.primaryNullMesssage"
        :display-increase-decrease="true"
      />
      <QdtComponent
        id="chart-alt-axis"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentEL"
      />
    </Square>
    <Square class="flex flex-wrap mb-4" color="medium" tight>
      <QlikKPI
        class="max-w-sm"
        :q-id="kpiEnrollmentSPED.qId"
        :title="kpiEnrollmentSPED.title"
        :subtitle="kpiEnrollmentSPED.subtitle"
        :secondary-label="kpiEnrollmentSPED.secondaryLabel"
        :description="kpiEnrollmentSPED.description"
        :primary-null-message="kpiEnrollmentSPED.primaryNullMesssage"
        :display-increase-decrease="true"
      />
      <QdtComponent
        id="chart-alt-axis"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrollmentSPED"
      />
    </Square>
    <Square
      class="flex flex-wrap mb-4"
      :class="{ 'justify-center': oneSchoolSelected }"
      color="light"
      tight
    >
      <QlikKPI
        class="max-w-sm"
        :q-id="kpiEnrolledInCatchmentPercent.qId"
        :title="kpiEnrolledInCatchmentPercent.title"
        :subtitle="kpiEnrolledInCatchmentPercent.subtitle"
        :secondary-label="kpiEnrolledInCatchmentPercent.secondaryLabel"
        :description="kpiEnrolledInCatchmentPercent.description"
        :primary-null-message="
          kpiEnrolledInCatchmentPercent.primaryNullMesssage
        "
        :display-increase-decrease="true"
        primary-size="medium"
      />
      <QdtComponent
        v-if="!oneSchoolSelected"
        class="flex-auto m-2 p-2 bg-white"
        type="QdtViz"
        :props="chartEnrolledInCatchmentPercent"
      />
    </Square>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters({
      anySelections: 'selections/anySelections',
      oneSchoolSelected: 'selections/oneSchoolSelected',
      selectedSchool: 'selections/selectedSchool',
      hasCatchment: 'selections/hasCatchment'
    }),
    chartEnrollmentTrend() {
      return {
        id: 'fvHgKR',
        type: 'linechart',
        height: '300px'
      }
    },
    chartEnrollmentEL() {
      return {
        id: 'FCpJfe',
        type: 'linechart',
        height: '300px'
      }
    },
    chartEnrollmentSPED() {
      return {
        id: 'LDkryum',
        type: 'linechart',
        height: '300px'
      }
    },
    chartEnrolledInCatchmentPercent() {
      return {
        id: 'ZvWmrC',
        type: 'barchart',
        height: '300px'
      }
    },
    kpiEnrollment() {
      return {
        qId: 'BwyQfy',
        description: `
          Student count for ${
            this.anySelections
              ? this.oneSchoolSelected
                ? this.selectedSchool
                : 'selected schools'
              : 'all District, Charter, Alternative, and Cyber Charter Schools'
          }.
          `,
        title: '',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    },
    // kpiEnrollmentEconDis() {
    //   return {
    //     qId: 'zxJhdS',
    //     description: `
    //       The percentage of students identified as economically disadvantaged,
    //       multiplied by a USDA-defined CEP factor of 1.6, and capped at 100%.
    //       Does not include charter school students.
    //       `,
    //     title: 'Economically Disadvantaged (CEP Rate)',
    //     subtitle: ' ',
    //     secondaryLabel: 'From  ' + this.$store.getters.sy_p,
    //     color: 'light',
    //     primaryNullMesssage: this.oneSchoolSelected
    //       ? 'Economic data is not reported for the selected school.'
    //       : 'Economic data is not reported for the selected schools'
    //   }
    // },
    kpiEnrollmentEL() {
      return {
        qId: 'rfNPaKa',
        description: `The percentage of students identified as English Learners based upon performance on the ACCESS exam.`,
        title: 'English Learners (EL)',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    },
    kpiEnrollmentSPED() {
      return {
        qId: 'fqFM',
        description: `The percentage of students with Individualized Education Programs (IEP) (for a reason other than "Gifted without Disability").`,
        title: 'Students with IEP',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light'
      }
    },
    kpiEnrolledInCatchmentPercent() {
      return {
        qId: 'VPbqeG',
        description: `
          The percentage of students attending their designated neighborhood catchment school, out of all students
          living in the catchment.
          `,
        title: 'Students Attending Catchment School',
        subtitle: ' ',
        secondaryLabel: 'From  ' + this.$store.getters.sy_p,
        color: 'light',
        primaryNullMesssage: this.oneSchoolSelected
          ? 'The selected school does not have a catchment area.'
          : 'The selected schools do not have catchment areas.'
      }
    }
  }
}
</script>
