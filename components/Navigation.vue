<template>
  <nav>
    <ul class="flex flex-wrap md:flex-no-wrap justify-between mb-4 text-sm">
      <NavigationItem id="nav-overview" label="Overview" link="/" exact />
      <NavigationItem
        id="nav-demographics"
        label="Demographics"
        link="/demographics"
      />
      <NavigationItem id="nav-trends" label="Trends" link="/trends" />
      <NavigationItem id="nav-catchment" label="Catchments" link="/catchment" />
    </ul>
  </nav>
</template>

<script>
import NavigationItem from '~sdp-components/Navigation/NavigationItem'

export default {
  components: {
    NavigationItem
  }
}
</script>
