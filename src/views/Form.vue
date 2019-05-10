<template>
  <v-layout>
    <v-flex xs12>
      <v-toolbar>
        <v-toolbar-title>{{ $route.params.id ? 'Editar' : 'Nova' }} issue</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="$router.push('/')" :class="{'d-none': loading}">
          Voltar
        </v-btn>
      </v-toolbar>

      <v-card>
        <v-container
          fluid
          class="elevation-1"
        >
          <v-layout wrap>
            <v-flex xs12 v-if="$route.params.id">
              <v-radio-group
                v-model="issue.state"
                row
                >
                <v-radio label="Aberto" value="open"></v-radio>
                <v-radio label="Fechado" value="closed"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Título"
                placeholder="Insira um título"
                v-model="issue.title"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea
                label="Descrição"
                placeholder="Insira uma descrição"
                v-model="issue.body"
                required
              ></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="issue.labels"
                :items="items"
                attach
                chips
                deletable-chips
                label="Labels"
                multiple
              >
              </v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions class="text-lg-right">
          <v-btn
            color="success"
            v-if="issue.locked && issue.state == 'open'"
            @click="unlock()"
          >
            Destravar
          </v-btn>
          <v-btn
            color="error"
            v-if="!issue.locked && issue.state == 'open'"
            @click="lock()"
          >
            Travar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="save()"
            >
            Gravar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-dialog
      v-model="loading"
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Por favor, aguarde...
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :top="true"
    >
      {{ snackbarText }}
      <v-btn
        flat
        @click="snackbar = false"
      >
        Fechar
      </v-btn>
    </v-snackbar>
  </v-layout>
</template>

<style lang="sass">

</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  Getter,
  Action,
  Mutation,
} from 'vuex-class';
import { Watch } from 'vue-property-decorator';
import {
  Issue,
  SET_ISSUE,
} from '../store/types';

@Component
export default class Form extends Vue {
  snackbar:boolean = false

  snackbarText:string = ''

  items:Array<string> = ['bug', 'duplicate', 'invalid', 'question']

  @Getter('issue') issue: any

  @Getter('loading') loading: any

  @Action('loadIssue') loadIssue: any

  @Action('unlockIssue') unlockIssue: any

  @Action('lockIssue') lockIssue: any

  @Action('createIssue') createIssue: any

  @Action('editIssue') editIssue: any

  @Mutation(SET_ISSUE) setIssue: any

  @Watch('$route')
  onRouteChanged() {
    if (this.$route.params.id) {
      this.loadIssue(this.$route.params.id);
      return;
    }
    this.setIssue({});
  }

  created() {
    if (this.$route.params.id) {
      this.loadIssue(this.$route.params.id);
      return;
    }

    this.setIssue({});
  }

  save() {
    let handler:string = 'createIssue';
    if (this.$route.params.id) {
      handler = 'editIssue';
    }

    delete this.issue.assignee;

    // @ts-ignore
    this[handler](this.issue)
      .then(() => {
        this.snackbarText = 'Issue gravada com sucesso!';
        this.snackbar = true;
        this.$router.push('/');
      })
      .catch(() => {
        this.snackbarText = 'Erro ao gravar Issue!';
        this.snackbar = true;
        this.$router.push('/');
      });
  }

  unlock() {
    const editIssue = {
      ...this.issue,
      locked: false,
    };

    this.unlockIssue(editIssue)
      .then(() => {
        this.snackbarText = 'Issue destravada com sucesso!';
        this.snackbar = true;
      })
      .catch(() => {
        this.snackbarText = 'Erro ao destravada Issue!';
        this.snackbar = true;
      });
  }

  lock() {
    const editIssue = {
      ...this.issue,
      locked: true,
    };

    this.lockIssue(editIssue)
      .then(() => {
        this.snackbarText = 'Issue travada com sucesso!';
        this.snackbar = true;
      })
      .catch(() => {
        this.snackbarText = 'Erro ao travar Issue!';
        this.snackbar = true;
      });
  }
}
</script>
