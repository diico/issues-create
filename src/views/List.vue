<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar>
        <v-toolbar-title>Issues</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="$router.push('/issue')" :class="{'d-none': loading}">
          Adicionar
        </v-btn>
      </v-toolbar>

      <v-card>
        <v-container
          fluid
          class="elevation-1"
        >
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                label="Pesquisar"
                placeholder="Pesquise pelas issues listadas"
                append-icon="fa fa-search"
                v-model="search"
              ></v-text-field>
            </v-flex>
            <v-flex xs6>
              <p class="text-lg-left">Encontrado {{ issues.length }} issue(s)</p>
            </v-flex>
            <v-flex xs6 class="text-lg-right">
              <v-btn-toggle v-model="toggle">
                <v-btn outline color="blue-grey" class="white--text">
                  Abertos
                  <v-icon right dark>fa-hand-paper</v-icon>
                </v-btn>
                <v-btn outline color="blue-grey" class="white--text">
                  Fechados
                  <v-icon right dark>fa-hand-rock</v-icon>
                </v-btn>
                <v-btn outline color="blue-grey" class="white--text">
                  Todos
                  <v-icon right dark>fa-hand-spock</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-flex>
          </v-layout>
        </v-container>

        <v-data-table
            :headers="headers"
            :items="issues"
            class="elevation-1"
            :loading="loading"
            :search="search"
            hide-actions
          >
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>

          <template v-slot:items="props">
            <tr @click="openIssue(props.item)" class="row-action">
              <td>
                <i
                  class="fas fa-lock mr-1"
                  v-if="props.item.locked"
                ></i>
                <strong>{{ props.item.title }}</strong>
              </td>
              <td>{{ props.item.user.login }}</td>
              <td class="text-xs-center">
                {{ (new Date(props.item.created_at)).toLocaleString() }}
              </td>
              <td class="text-xs-center">
                <v-chip
                  v-for="label in props.item.labels"
                  :key="label.id"
                  :color="`#${label.color}`"
                  outline
                  small
                  >
                  <strong>{{ label.name }}</strong>
                </v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style lang="sass">
.row-action
  cursor: pointer
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  Getter,
  Action,
} from 'vuex-class';
import { Watch } from 'vue-property-decorator';
import { Issue } from '../store/types';

@Component
export default class List extends Vue {
  toggle:number = -1

  search:string = ''

  headers:Array<any> = [
    {
      text: 'Issue',
      align: 'left',
      value: 'title',
    },
    {
      text: 'Autor',
      align: 'left',
      value: 'user.login',
    },
    {
      text: 'Criado em',
      align: 'center',
      value: 'created_at',
      sortable: false,
    },
    {
      text: 'Labels',
      align: 'center',
      sortable: false,
    },
  ]

  @Watch('toggle')
  onToggleChanged(val: number, oldVal: number) {
    let state;
    switch (val) {
      case 0:
        state = 'open';
        break;
      case 1:
        state = 'closed';
        break;
      case 2:
        state = 'all';
        break;
      default:
        this.toggle = 2;
        return;
    }
    this.loadIssues({ state });
  }

  @Getter('issues') issues: any

  @Getter('loading') loading: any

  @Action('loadIssues') loadIssues: any

  created() {
    this.toggle = 0;
  }

  openIssue(issue: Issue) {
    this.$router.push({ path: `/issue/${issue.number}` });
  }
}
</script>
