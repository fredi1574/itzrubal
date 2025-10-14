import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '22xxdrf2',
    dataset: 'project'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
