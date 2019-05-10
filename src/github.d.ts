import Vue from 'vue'

interface Issue {
  createIssue(issueData: any, cb: any): any,
  listIssues(options: any, cb: any): any,
  getIssue(options: any, cb: any): any,
  editIssue(issue: any, issueData: any, cb: any): any,
}

declare module 'vue/types/vue' {
  interface Vue {
    $remoteIssues: Issue
  }
}
