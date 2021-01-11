<template>
  <div>
    <div class="mx-8">
      <div ref="v-summary" name="Summary" color="tint">
        <h1>Summary</h1>
        <p>
          The Enrollment-Oct 1 Snapshot website provides visualizations of
          city-wide school enrollment data based on the annual October 1
          snapshot. The October 1 Snapshot (also known as the October Student
          Data Set) is an annual enrollment snapshot taken on the first school
          day in October each school year. The October Snapshot is considered
          the official school enrollment count for the school year and is
          reported to PDE and the federal government.
        </p>
        <ul>
          <li>
            <span class="font-semibold">Data Refresh:</span> Annually, generally
            in November
          </li>
          <li>
            <span class="font-semibold">Data Attribution:</span> Students are
            attributed to the school at which they were enrolled on October 1 of
            the respective year.
          </li>
          <li>
            <span class="font-semibold">School Sectors Included:</span>
            District, Alternative, Charter, and Non Public Special Education
          </li>
          <li>
            <span class="font-semibold">School Years Included:</span> SY 2014-15
            to SY {{ $store.getters.sy_c }}
          </li>
        </ul>
        <div class="section-break" />
      </div>
      <div ref="v-metrics" name="Metrics">
        <h1>Metrics</h1>
        <h2>Ennrollment (# of students)</h2>
        <p>
          Count of students enrolled as recorded in the October 1 Snapshot.
        </p>
        <h2>Percent Attending Zoned School</h2>
        <p>
          The percentage of students attending the school they are assigned to
          based on their address; in other words, the percentage of students who
          reside within the school’s catchment boundary who are attending that
          school. Note: Kensington High School, Kensington CAPA, and Kensington
          Health Sciences share a catchment area. All students living in this
          area are assigned to the Kensington HS catchment. Catchment metrics
          are only calculated for Kensington High School and do not include
          students attending either CAPA or Health Sciences.
        </p>
        <h2>Percent Coming From Neighborhood</h2>
        <p>
          Percent of a school’s enrolled students who are assigned to the school
          based on their address; in other words, the percentage of students
          enrolled in a school who reside within the school’s catchment
          boundary.
        </p>
        <div class="section-break" />
      </div>
      <div ref="v-research" name="Research and Reports" color="tint">
        <h1>SDP Research and Reports</h1>
        <div v-for="(prod, index) in researchProduct" :key="index">
          <div v-if="researchRelevance[index].text === '1'" class="research">
            <div class="research--product">
              <a :href="researchLink[index].text" target="_blank">
                {{ researchProduct[index].text || '' }}
              </a>
            </div>
            <div class="research--type-date">
              {{ researchType[index].text || '' }},
              {{ researchDate[index].text || '' }}
            </div>
            <div class="research--authors">
              {{ researchAuthors[index].text || '' }}
            </div>
            <div class="research--abstract">
              {{ researchAbstract[index].text || '' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  layout: 'default',
  computed: {
    ...mapState({
      researchAbstract: (state) => state.research.values.abstract,
      researchAuthors: (state) => state.research.values.authors,
      researchDate: (state) => state.research.values.date,
      researchLink: (state) => state.research.values.link,
      researchProduct: (state) => state.research.values.product,
      researchRelevance: (state) => state.research.values.relevance,
      researchType: (state) => state.research.values.type
    })
  }
}
</script>
<style lang="postcss" scoped>
a {
  @apply underline text-blue-500;
}

h1 {
  font-size: 20pt;
  font-weight: bold;
}

h2 {
  font-size: 18pt;
  font-weight: bold;
}

p,
ul {
  font-size: 13pt;
  padding-bottom: 1rem;
  list-style-type: circle;
}
li {
  margin-left: 4rem;
}

.section-break {
  padding-bottom: 3rem;
}

.research {
  padding-bottom: 1rem;
}

.research--product {
  font-size: 18pt;
  @apply text-blue-600 underline;
}

.research--authors,
.research--type-date {
  font-size: 15pt;
}

.research--abstract {
  font-size: 13pt;
}

.research--authors {
  font-style: italic;
}
</style>
