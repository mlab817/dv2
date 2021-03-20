<template>
  <q-page padding>
    <h6 class="text-h6">
      Dragons
    </h6>
    <div>
      <q-table :data="dragons" :columns="columns" :filter="filter" flat bordered>
        <template v-slot:top-right>
          <q-input v-model="filter" dense outlined rounded placeholder="Search"></q-input>
        </template>
        <template v-slot:body-cell-element="props">
          <q-td :props="props">
            <q-img :src="'/statics/elements/' + props.row.element.toLowerCase() + '.png'" :alt="props.row.element.toLowerCase()" width="50px" />
          </q-td>
        </template>

        <template v-slot:body-cell-star="props">
          <q-td :props="props">
            <q-rating
              v-model="props.row.star"
              max="6"
              size="1.5em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { DRAGONS } from 'src/data/dragons';

export default {
  computed: {
    dragons() {
      const dragons = DRAGONS,
        dragonsArray = []

      Object.keys(dragons).forEach(key => {
        dragonsArray.push({
          ...dragons[key],
          id: key
        })
      })

      return dragonsArray
    }
  },
  data() {
    return {
      filter: '',
      columns: [
        {
          name: 'element',
          label: 'Element',
          field: 'element',
          sortable: true
        },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'type',
          label: 'Type',
          field: 'type',
          sortable: true
        },
        {
          name: 'star',
          label: 'Star',
          field: 'star',
          sortable: true
        }
      ]
    }
  }
}
</script>
