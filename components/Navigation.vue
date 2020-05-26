<template>
  <nav>
    <ul class="flex flex-wrap md:flex-no-wrap justify-between mb-4 text-sm">
      <NavigationItem label="Overview" link="/overview" />
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
