<template>
  <q-page padding>
    <q-table :data="seals" :columns="columns" wrap-cells>
      <template v-slot:body-cell-image="props">
        <q-td :props="props">
          <q-img :src="props.row.img"></q-img>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  name: 'PageSeals',
  computed: {
    seals() {
      const seals = this.$store.state.seals.seals,
        arrayData = []

      Object.keys(seals).forEach(key => {
        arrayData.push({
          key: key,
          ...seals[key]
        })
      })

      console.log(arrayData)

      return arrayData
    }
  },
  data() {
    return {
      columns: [
        {
          name: 'image',
          label: 'Image',
          field: ''
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name'
        },
        {
          name: 'description',
          label: 'Description',
          field: 'desc'
        }
      ]
    }
  },
  methods: {
    loadData() {
      this.$store.dispatch('seals/loadSeals')
    }
  },
  created() {
    this.loadData()
  }
}
</script>

<style></style>
