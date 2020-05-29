<template>
  <nav>
    <ul class="flex flex-wrap md:flex-no-wrap justify-between mb-4 text-sm">
      <NavigationItem label="Overview" link="/" exact />
      <NavigationItem label="Demographics" link="/demographics" />
      <NavigationItem label="Trends" link="/trends" />
      <NavigationItem label="Neighborhoods" link="/catchment" />
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
