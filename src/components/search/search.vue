<template>
  <div class="container">
    <ar-input placeholder="Search Name"></ar-input>
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>

      <md-table-row v-for="(profile, index) in profiles" v-bind:key="index">
        <md-table-cell md-numeric>{{ profile.id }}</md-table-cell>
        <md-table-cell>{{ profile.name }}</md-table-cell>
        <md-table-cell>{{ profile.description }}</md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button md-raised" v-on:click="goToReadme(profile.full_name)">
            <md-icon>library_books</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
     <ar-toast></ar-toast>
  </div>
</template>

<script>
  import { of } from 'rxjs';
  import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

  import router from '../../route';
  import { getProfiles } from './search.service';

  export default {
    name: 'Search',
    async created() {
      const element = await this;
      element.$el.querySelector('ar-input')
        .addEventListener('ar.change', function(e) {
          element.loading = true;
          of(e.detail.value)
            .pipe(
              debounceTime(700),
              distinctUntilChanged()
            )
            .subscribe(async text => {
              element.profiles = text.length 
                ? await getProfiles(text).catch(error => element.errorHandler(error))
                : [];
            })
      })
    },
    data() {
      return {
        message: null,
        duration: 0,
        loading: false,
        profiles: []
      }
    },
    methods: {
      goToReadme(repo) {
        const [ username,  repository ] = repo.split('/');
        router.push({
          name: 'readme',
          params: { username: username, repo: repository }
        })
      },
      errorHandler(error) {
        const toast = this.$el.querySelector('ar-toast');
        toast.message = {
          severity: 'error',
          summary: 'Error',
          detail: `${error.status} - ${error.message}.`
        };
        toast.duration = 3000;
        this.loading = false;
      }       
    }
  }
</script>

<style scoped>
.md-table-row:hover:not(.md-header-row) .md-table-cell{
  background: unset!important;
}
</style>
