<template>
  <q-page padding>

    <q-dialog v-model="addDragonDialog">
      <q-card style="min-width: 360px;">
        <q-card-section>
          Add Dragon
        </q-card-section>
        <q-form @submit="addDragon" @reset="handleReset" ref="addDragon">
          <q-card-section>
            <q-input v-model="dragon.id" label="ID" type="number" :rules="required"></q-input>
            <q-input v-model="dragon.name" label="Name" :rules="required"></q-input>
            <q-input v-model="dragon.description" label="Description" :rules="required"></q-input>
            <q-select v-model="dragon.dragonType" label="Type" :options="dragonTypes" :rules="required"></q-select>
            <q-checkbox v-model="dragon.awaken" label="Can Awaken"></q-checkbox>
            <q-input v-model="dragon.awakenSkill" label="Awakening Skill"></q-input>
            <q-input v-model="dragon.awakenSkillDesc" label="Awakening Skill Description"></q-input>
            <q-input v-model="dragon.awakenSkillImg" label="Awakening Skill Image"></q-input>
            <q-item-label header>Base Stat</q-item-label>
            <q-input v-model="dragon.baseStat.hp" label="HP" type="number" :rules="required"></q-input>
            <q-input v-model="dragon.baseStat.atk" label="ATK" type="number" :rules="required"></q-input>
            <q-input v-model="dragon.baseStat.def" label="DEF" type="number" :rules="required"></q-input>
            <q-item-label header>Stat Gain per Level</q-item-label>
            <q-input v-model="dragon.statGain.hp" label="HP" type="number" :rules="required"></q-input>
            <q-input v-model="dragon.statGain.atk" label="ATK" type="number" :rules="required"></q-input>
            <q-input v-model="dragon.statGain.def" label="DEF" type="number" :rules="required"></q-input>
            <q-input v-model="dragon.gen" label="Generation" :rules="required"></q-input>
            <q-select v-model="dragon.element" label="Element" :options="elements" :rules="required"></q-select>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="reset" color="negative" type="reset"></q-btn>
            <q-btn label="save" color="positive" type="submit"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <div class="row">
      <q-table class="col" :data="dragons" :columns="columns" wrap-cells :filter="filter">
        <template v-slot:top-right>
          <div class="row q-gutter-md">
            <q-input v-model="filter" dense placeholder="Filter"></q-input>
            <q-btn @click="showAddDragon" label="Add" color="primary"></q-btn>
          </div>
        </template>
        <template v-slot:body-cell-image="props">
          <q-td :props="props">
            <div class="row no-wrap">
              <q-img
                v-for="form in forms"
                :key="form"
                :src="`https://d223xg3cmn8svr.cloudfront.net/img/web/dragon/${props.row.id}/${form}.png`"
                height="50px"
                width="50px"
              />
            </div>
          </q-td>
        </template>
      </q-table>

    </div>
  </q-page>
</template>

<script>
const convertToOptions = (obj) => {
  const options = []

  Object.keys(obj).forEach(key => {
    options.push({
      label: obj[key].name,
      value: obj[key]
    })
  })

  return options
}

export default {
  name: 'PageIndex',
  computed: {
    dragons() {
      const dragons = this.$store.state.dragons.dragons,
        dragonArray = []
      Object.keys(dragons).forEach(key => {
        dragonArray.push({
          key: key,
          ...dragons[key]
        })
      })

      return dragonArray
    },
    dragonTypes() {
      return convertToOptions(this.$store.state.options.dragonTypes)
    },
    elements() {
      return convertToOptions(this.$store.state.options.elements)
    }
  },
  data() {
    return {
      filter: null,
      forms: ['egg_small','box_baby','box_child','box_adult','box_evolution'],
      addDragonDialog: false,
      required: [ val => !!val || '* Required'],
      columns: [
        {
          name: 'image',
          label: 'Image'
        },
        {
          name: 'name',
          label: 'name',
          field: 'name',
          align: 'center'
        },
        {
          name: 'element',
          label: 'Element',
          field: row => typeof row.element === 'object' ? row.element.name : row.element,
          align: 'center'
        },
        {
          name: 'description',
          label: 'Description',
          field: 'description',
          align: 'left'
        }
      ],
      dragon: {
        id: null,
        awaken: false,
        description: '',
        img: '',
        dragonType: '',
        awakenSkillImg: '',
        awakenSkillDesc: '',
        awakenSkill: '',
        adult: '',
        small: '',
        evolution: '',
        name: '',
        gen: '',
        statGain: { atk: 0, hp: 0, def: 0 },
        child: '',
        baby: '',
        baseStat: { atk: 0, def: 0, hp: 0 },
        element: ''
      },
    }
  },
  methods: {
    showAddDragon() {
      this.addDragonDialog = true
    },
    addDragon() {
      this.$store.dispatch('dragons/addDragon', this.dragon)
        .then(() => this.$refs.addDragon.reset())
    },
    handleReset() {
      this.dragon = {
        id: null,
        awaken: false,
        description: '',
        img: '',
        dragonType: '',
        awakenSkillImg: '',
        awakenSkillDesc: '',
        awakenSkill: '',
        adult: '',
        small: '',
        evolution: '',
        name: '',
        gen: '',
        statGain: { atk: 0, hp: 0, def: 0 },
        child: '',
        baby: '',
        baseStat: { atk: 0, def: 0, hp: 0 },
        element: ''
      }
    }
  },
  created() {
    this.$store.dispatch('dragons/loadDragons')
    this.$store.dispatch('options/loadOptions','elements')
    this.$store.dispatch('options/loadOptions','dragonTypes')
  }
}
</script>
